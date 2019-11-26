import md5 from "md5";
import { URL } from "url";

const fastlyURL = "https://i.guim.co.uk/img/";

const sign = (s: string, salt: string): string => {
    return md5(salt + s);
};

const source = (guimURL: string): string => {
    const re = /(media|static|uploads|sport).guim.co.uk/;
    const found = guimURL.match(re);

    if (found) {
        return found[1]; // capture group
    }

    return "media";
};

// https://docs.fastly.com/api/imageopto/#image-api-reference
interface Profile {
    width?: number;
    height?: number;
    dpr?: number;
    fit?: "bounds" | "cover" | "crop";
    crop?: string;
    trim?: string;
    pad?: string;
    canvas?: string;
    "bg-color"?: string;
    orient?: string;
    overlay?: string;
    "overlay-base64"?: string;
    brightness?: number;
    contrast?: number;
    saturation?: number;
    sharpen?: string;
    blur?: number;
    format?: string;
    frane?: 1;
    quality?: number;
    auto?: "webp";
    enable?: "upscale";
    disable?: "upscale";
    "resize-filter"?:
        | "nearest"
        | "bilinear"
        | "bicubic"
        | "lanczos2"
        | "lanczos3";
}

// See:
// https://github.com/guardian/frontend/blob/master/common/app/views/support/ImageProfile.scala#L242
export const format = (
    masterURL: string,
    salt: string,
    params: Profile
): string => {
    const qs = Object.entries(params)
        .map(kv => `${kv[0]}=${kv[1]}`)
        .join("&");

    const url = new URL(masterURL);
    const pathQuery = url.pathname + "?" + qs;
    const src = source(masterURL);
    const sig = sign(pathQuery, salt);
    const updatedPathQuery = pathQuery + "&s=" + sig;

    return fastlyURL + src + updatedPathQuery;
};
