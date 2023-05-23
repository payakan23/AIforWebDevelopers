import Home from "@/views/Home.vue";
import Details from "@/views/Details.vue";
import Player from "@/views/Player.vue";

const routes = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "Details",
        path: "/details/:id",
        component: Details,
        props: true,
    },
    {
        name: "Player",
        path: "/player/:videoKey",
        component: Player,
        props: true,
    },

]

export default routes;