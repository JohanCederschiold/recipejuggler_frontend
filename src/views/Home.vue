<template>
    <div class="screen">
        <h1>Välkommen</h1>
        <p>
            Detta är ett projekt med syftet att underlätta vår middagsplanering genom att hjälpa oss hålla 
            reda på våra favoritrecept och samtidigt hjälpa oss att autosumera inköpslistorna. 
        </p>
        <h2>2020-05-30</h2>
        <p>
            Detta är första iterationen av appen och det kommer att finnas en hel del buggar och/eller saker som kan 
            förbättras eller förändras. 
        </p>
        <p>
            När man exempelvis lägger in ett recept med nya ingredienser, blir man ombedd att också registrera
            vilken måttenhet som skall förknippas med den aktuella ingrediensen. Detta är för att autosumeringen 
            under Lista skall fungera korrekt. I början kommer majoriteten av ingredienserna att vara nya.
        </p>
        <img class="welcomeImage" src="@/assets/images/welcome.jpg" alt="">
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
        max-width: 60%;
    }

    .welcomeImage {
        max-width: 100%;
        height: auto;

    }
</style>