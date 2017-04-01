module.export = {
    loader: function (items, thingToDo, allDone) {
        if (!items) {
            // nothing to do.
            return;
        }

        if ("undefined" === items.length) {
            // convert single item to array.
            items = [items];
        }

        var count = items.length;

        // this callback counts down the things to do.
        var thingToDoCompleted = function (items, i) {
            count--;
            if (0 == count) {
                allDone(items);
            }
        };

        for (var i = 0; i < items.length; i++) {
            // 'do' each thing, and await callback.
            thingToDo(items, i, thingToDoCompleted);
        }
    },

    loadImage: function (items, i, onComplete) {
        var onLoad = function (e) {
            e.target.removeEventListener("load", onLoad);

            // this next line can be removed.
            // only here to prove the image was loaded.
            document.body.appendChild(e.target);

            // notify that we're done.
            onComplete(items, i);
        }
        var img = new Image();
        img.addEventListener("load", onLoad, false);
        img.src = items[i];
    }
}