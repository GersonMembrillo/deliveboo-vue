<template>
    <div class="container">
        <div class="mx-auto">
            <h1 class="text-uppercase fs-1 text-danger fw-bold">ooppss not found!</h1>
            {{ $route.query.e }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style lang="scss" scoped></style>