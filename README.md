# Compatibility: Synology

A module for [RoyalArchives](https://github.com/royalarchives/server) that adds compatibility with the Synology DS Audio apps for iPhone and Android, and with some additional work the [Synology Audiostation](https://www.synology.com/en-us/dsm/feature/audio_station) web interface.

### Documentation

- [How to use](#how-to-use)
- [Index data structure](#index-data-structure)
- [Using the API with NodeJS](#using-the-media-index-with-nodejs)

## How to use

First install the module with `NPM`:

    $ npm install @royalarchives/server-synology

If you are using [Library](https://github.com/royalarchives/library) from the command-line include the module name in your arguments:

    $ node scanner.js @royalarchives/library-radio /path/to/files

If you are using [Library](https://github.com/royalarchives/library) with NodeJS include the module name in the parameters:

    const Library = require('@royalarchives/library')
    await Library.scan(['@royalarchives/library-radio'], ['/path/to/files'])

## Index data structure

[Top of page](#documentation)

## Using the API with NodeJS

[Top of page](#documentation)

## License

MIT
