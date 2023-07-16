<template>
    <!-- Modal -->
    <div class="modal fade" id="warningModal" tabindex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 class="modal-title" id="warningModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div> -->
                <div class="modal-body">
                    Attenzione! Se aggiungi questo elemento nel carrello perderai tutti gli elementi provenienti da <span @click="goToRestaurant()" class="text-primary text-decoration-underline">{{ restaurantName }}</span>. Sicuro di voler procedere?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                    <button @click="clearCart()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Procedi</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            restaurantName: ""
        }
    },

    methods: {
        clearCart() {
            localStorage.setItem('cartItems', JSON.stringify([]));
            localStorage.setItem("cartRestaurantSlug", "");
            this.$emit("cartCleared");
        },

        goToRestaurant() {
            window.location.href = "/restaurants/" + localStorage.getItem("cartRestaurantSlug");
        }
    },

    mounted() {
        this.restaurantName = localStorage.getItem("cartRestaurantName");
    }
}
</script>

<style lang="scss" scoped>
.modal {
    z-index: 1000000
}
</style>