<script>
    import {userState} from "../store/UserStore";
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";

    let loading = false

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
        loading = true
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = "ko";
        try {
            const res = await firebase.auth().signInWithPopup(provider);
            await firebase.auth().currentUser.getIdToken(true);
            // console.log(res)
            setTimeout(function () {
                window.location.href = '/'
            }, 100)
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


    @keyframes rotate-loading {
        0% {
            transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
        }
    }

    @keyframes rotate-loading {
        0% {
            transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
        }
    }

    @keyframes loading-text-opacity {
        0% {
            opacity: 0
        }
        20% {
            opacity: 0
        }
        50% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }

    .loading_container{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.5);
    }

    .loading {
        height: 100px;
        position: relative;
        width: 100px;
        border-radius: 100%;
    }




    .loading {
        border: 2px solid transparent;
        border-color: transparent #fff transparent #fff;
        animation: rotate-loading 1.5s linear 0s infinite normal;
        transform-origin: 50% 50%;
    }

    /*.loading_container:hover .loading {*/
    /*    border-color: transparent #E45635 transparent #E45635;*/
    /*}*/

    /*.loading_container:hover .loading,*/
    /*.loading_container .loading {*/
    /*    transition: all 0.5s ease-in-out;*/
    /*}*/

    #loading-text {
        animation: loading-text-opacity 2s linear 0s infinite normal;
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
        opacity: 0;
        position: absolute;
        text-align: center;
        text-transform: uppercase;
        left: 50%;
        top: 50%;
        transform: translate(-50% , -50%);
        width: 100px;
    }


</style>

<div class="login_container w-full h-screen bg-gray-100 flex items-center justify-center flex-col ">
    <h2 class="text-2xl text-center font-bold">LOGIN</h2>
    <div class="max-w-xs w-full">
        <div class="input_group mt-4">
            <button class="bg-white rounded w-full flex items-center justify-center py-2 border-solid border border-gray-300 focus:shadow-none focus:outline-none" type="button"
                    on:click={onClickGoogleLogin}>
                <i class="fab fa-google mr-4"/>
                <span>구글로 시작</span>
            </button>
        </div>
    </div>
</div>

{#if loading}
<div class="loading_container">
    <div class="loading"></div>
    <div id="loading-text">loading</div>
</div>
{/if}}
