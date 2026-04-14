# Navigator Plugin developer environment

This is the first assisted development package for making plugins for Nextspace.

This is a very basic plugin that detects Entity selection changes and states how many Entities are selected.

It is intended to be run in the Navigator Cursor Bar (top-left toolbar).

It can however work anywhere in Navigator, I recommend removing the absolute positioning CSS if you plan to try use it within the selected Entity panel instead.

<br/>

## Prerequisites

This will rely on installing some NPM packages for type referencing, and python to perform the deployment of your plugin.

- https://nodejs.org/en/download

- https://www.python.org/downloads/


<br/>

## Development

To start please fill out the config [here](./config.py).

<br/>

Afterwards run:

```
npm i
```

This will install the packages that are available to the plugin when it's run in Navigator. This allows your IDE to reference the types and give you information on the objects you are interacting with.

After installing this you can `ctrl + left-click` on the type definitions to see more about them, and they will guide you as you write code in your IDE.

For example you can `ctrl + left-click` on `import("bruce-cesium").VisualsRegister.Register` within `index.js`.

<br/>

When you want to push a change to your plugin run:

```
python3 ./deploy.py
```

You may need to use `python` rather than `python3` if one is unrecognized for you.

This script references [config.py](./config.py) for your account and plugin details.

<br/>
<br/>

## Notes

This was developed and tested on an Ubuntu based linux distribution. This is why certain installation steps of the pre-requisites are not filled out as they are likely to differ between developers.

In time we can expand the different operating system installation information.