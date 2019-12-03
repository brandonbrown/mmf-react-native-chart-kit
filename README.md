All of the changes you see within this repo are for specific use cases I've found I needed solutions to.
[🐝See Original Repo for Full Documentation](https://github.com/indiespirit/react-native-chart-kit)

#Changes
## Bar chart

![Bat Chart](https://i.imgur.com/jVHEWiI.jpg)

Converted `<Rect>` to `<Path>` to allow for rounded corners. Properties may be passed as below:

**These are still a work in progress. Does not play well with all values yet. These are paused here as they work for my specific situation.**
```js
const chartConfig = {
  topRadius: 8,
  bottomRadius: 20
};
```
                                   |
