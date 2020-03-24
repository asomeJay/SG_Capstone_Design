import express from "express";

const globalRouter = express.Router();

export const location = (req, res) => {
    console.log(res);
    if (document.navigator.geolocation) {
        console.log("IN");
        var new_div = document.createElement("div");
        navigator.geolocation.getCurrentPosition(function (pos) {
            new_div.innerHTML(pos.coords);
            console.log(pos.cords);
            document.body.appendChild(new_div);
        })
    }
    res.render('./views/mask.html');
}

globalRouter.get('/mask', location);

export default globalRouter;