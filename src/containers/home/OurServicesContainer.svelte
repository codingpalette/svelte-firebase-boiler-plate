<script>
    import SectionLayout from '../../components/layout/SectionLayout.svelte'
    import ServicesList from "../../components/ServicesList.svelte";

    let Lists = [
        {
            id: 1,
            icons: "fab fa-codepen",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 2,
            icons: "fas fa-cogs",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 3,
            icons: "fas fa-dharmachakra",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 4,
            icons: "fas fa-box-open",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 5,
            icons: "fas fa-star-of-david",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 6,
            icons: "fab fa-github",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        }
    ];
</script>

<style>

</style>


<SectionLayout Title="OUR SERVICES" subTitle="WELCOME">
    <ul class="flex items-center justify-center flex-wrap">
        {#each Lists as list}
            <ServicesList {list}/>
        {/each}
    </ul>
</SectionLayout>


