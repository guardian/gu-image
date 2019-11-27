# GU Image

**Note, this will not work without the correct salt value so only usuable within
the Guardian.**

Security: use this library **server-side only.**

A server-side JS/Typescript library to sign and format master images so that
they can be served through our Fastly image service.

    format(url: string, salt: string, profile: Profile)

`url` must be a valid master image URL.

`salt` must be kept secure. Do not use this library on the client-side.

`Profile` can include any properties supported by the Fastly image service. Docs
here: https://docs.fastly.com/api/imageopto/#image-api-reference.
