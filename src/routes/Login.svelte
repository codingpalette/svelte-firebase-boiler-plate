<script>
    import {userState} from "../store/UserStore";
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";

    onMount(() => {
        if ($userState) {
            push("/");
        }
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         push("/");
        //     }
        // });
    });

    const onClickGoogleLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = "ko";
        try {
            const res = await firebase.auth().signInWithPopup(provider);
            await firebase.auth().currentUser.getIdToken(true);
            setTimeout(function(){
                push("/");
            },100)
            // console.log(res.user);

        } catch (e) {
            console.log(e);
        }
    };
</script>

<style>
    .input_group .fa-google {
        color: #e1412f;
    }
</style>

<div class="login_container w-full h-screen bg-gray-100 flex items-center justify-center flex-col ">
    <h2 class="text-2xl text-center font-bold">LOGIN</h2>
    <div class="max-w-xs w-full">
        <div class="input_group mt-4">
            <button class="bg-white rounded w-full flex items-center justify-center py-2 border-solid border border-gray-300 focus:shadow-outline focus:outline-none" type="button" on:click={onClickGoogleLogin}>
                <i class="fab fa-google mr-4"/>
                <span>구글로 시작</span>
            </button>
        </div>
    </div>
</div>
