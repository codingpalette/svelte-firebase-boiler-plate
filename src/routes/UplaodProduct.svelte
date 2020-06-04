<script>
    import {userState} from "../store/UserStore";
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import UploadForm from "../containers/uplaodproduct/UploadForm.svelte";

    onMount(() => {
        if ($userState.level !== 0) {
            push("/");
        }
    });
</script>

<style>

</style>


<UploadForm/>
