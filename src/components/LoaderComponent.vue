<template>
    <div class="d-flex align-items-center justify-content-center my-5">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
</template>

<script>
export default {
    name: 'LoaderComponent',
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;
@use "../assets/styles/partials/mixins" as *;

.circle {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;

    &:first-child {
        animation: bounce 0.8s infinite;
        background-color: $primary_color;
    }

    &:nth-child(2) {
        animation: bounce 0.8s infinite 0.2s;
        background-color: $primary_color;
    }

    &:last-child {
        animation: bounce 0.8s infinite 0.4s;
        background-color: $primary_color;
    }
}

@keyframes bounce {
    40% {
        transform: translateY(-10px);
    }

    50% {
        transform: translateX(0);
    }
}
</style>