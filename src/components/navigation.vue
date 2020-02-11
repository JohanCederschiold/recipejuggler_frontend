<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-navbar-brand href="#">
                    <router-link to="/home" class="nav-link">
                        Home
                    </router-link>
                </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">
                    <router-link to="/addrecipe" class="nav-link">
                        Add Recipe
                    </router-link>
                </b-nav-item>
                <b-nav-item href="#">
                    <router-link to="/allrecipes" class="nav-link">
                        All Recipes
                    </router-link>
                </b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div class="content">
            <router-view>
            </router-view>
        </div>

    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .nav-link {
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
    }

</style>