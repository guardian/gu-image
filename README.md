# GU Image

**Note, this will not work without the correct salt value so only usuable within
the Guardian.**

A JS/Typescript library to sign and format master images so that they can be
served through our Fastly image service.

    format(url: string, salt: string, profile: Profile)

Where `Profile` can include any properties supported by the Fastly image
service. Docs here: https://docs.fastly.com/api/imageopto/#image-api-reference.
