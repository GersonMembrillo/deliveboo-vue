import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import Restaurants from '../pages/Restaurants.vue';
import ShowRestaurant from '../pages/ShowRestaurant.vue';
import NotFound from '../pages/NotFound.vue';
import CheckoutPage from '../pages/CheckoutPage.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
		},
		{
			path: '/restaurants',
			name: 'all-restaurants',
			component: Restaurants,
		},
		{
			path: '/restaurants/:slug',
			name: 'restaurant-show',
			component: ShowRestaurant,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: NotFound
		},

		{
			path: '/checkout',
			name: 'checkout',
			component: CheckoutPage,
		},
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/AboutView.vue'),
		// },
	],
});

export { router };
