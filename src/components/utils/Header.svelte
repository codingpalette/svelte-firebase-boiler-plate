<script>
    import {siteState, errorState, siteOk} from "../../store/SiteStore";
    import {userState} from "../../store/UserStore";
    import {fly} from "svelte/transition";
    import {link, location } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    import PenButton from "../PenButton.svelte";

    let logo = "images/svelte-logo.svg";
    let drawerOpen = false;
    let modalOpen = false;
    let userMenuOpen = false;
    let inputTitle = "";

    const onClickDrawerOpen = () => {
        drawerOpen = true;
    };
    const onClickDrawerClose = () => {
        drawerOpen = false;
    };

    const onClickModalOpen = () => {
        modalOpen = true;
    };
    const onClickModalClose = () => {
        modalOpen = false;
    };
    const onClickUserMenuOpen = () => {
        userMenuOpen = true;
    };

    const onClickWindow = e => {
        if (!e.target.matches(".user_image")) {
            userMenuOpen = false;
        }
    };

    const onClickLogout = () => {
        firebase.auth().signOut();
        $userState = null;
    };

    const onClickTitleModify = async () => {
        try {
            await firebase.database().ref().child("site").update({title: inputTitle});
        } catch (e) {
            console.log(e);
            // errorState.update(v => {
            //   const x = { ...v };
            //   x.open = true;
            //   x.errorMessage = "권한이 없습니다";
            //   return x;
            // });
        } finally {
            modalOpen = false;
        }
    };

</script>

<style>
    /* :global(header a.active) {
      font-weight: bold;
      text-decoration: underline;
    } */

    header nav {
        margin: 0 auto;
    }

    header nav .logo_box a {
        display: block;
        width: auto;
        height: 100%;
    }

    header nav .logo_box img {
        display: block;
        height: 100%;
        width: auto;
    }

    .drawer_ul {
        width: 250px;
    }

    .drawer_ul li a {
        display: block;
    }

    .user_menu {
        position: absolute;
        right: 0;
        top: 100%;
        margin-top: 0.5rem;
    }

    .user_menu ul {
        width: 12rem;
    }
</style>

<svelte:window on:click={onClickWindow}/>

{#if $location !== '/login'}
    <header class="sticky left-0 top-0 bg-white shadow z-30">
        <nav class="flex items-center flex-wrap p-3">
            <button type="button" class="bg-white hover:bg-gray-300 text-black h-10 w-10 flex items-center justify-center rounded-full focus:shadow-none focus:outline-none"
                    on:click={onClickDrawerOpen}>
                <i class="fas fa-bars"></i>
            </button>
            <div class="logo_box text-base font-medium flex items-center flex-shrink-0 ml-4 h-10">
                <a href="/" use:link>
                    <img src={logo} alt="로고"/>
                </a>
            </div>

            <!-- <PenButton clickEvent={onClickModalOpen} /> -->

            <div class="ml-auto relative">
                {#if $userState}
                    <button type="button" class="user_menu_btn h-10 w-10 flex items-center justify-center overflow-hidden rounded-full focus:shadow-none focus:outline-none"
                            on:click={onClickUserMenuOpen}>
                        <img class="user_image" src={$userState.photoURL} alt=""/>
                    </button>
                    {#if userMenuOpen}
                        <div class="user_menu shadow-md rounded border-solid border border-gray-300 bg-white">
                            <ul>
                                <li>
                                    <a href="/keep-products" use:link class="cursor-pointer hover:bg-gray-300 py-3 px-4 block">
                                        <i class="fas fa-heart"></i>
                                        <span class="ml-2">장바구니</span>
                                    </a>
                                </li>
                                {#if $userState.level === 0}
                                    <li>
                                        <a href="/upload-product" use:link class="cursor-pointer hover:bg-gray-300 py-3 px-4 block">
                                            <i class="fas fa-upload"></i>
                                            <span class="ml-2">업로드</span>
                                        </a>
                                    </li>
                                {/if}
                                <li>
                                    <div class="cursor-pointer hover:bg-gray-300 py-3 px-4 block" on:click={onClickLogout}>
                                        <i class="fas fa-sign-out-alt"></i>
                                        <span class="ml-2">로그아웃</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    {/if}
                {:else}
                    <a href="/login" use:link class="bg-purple-500 hover:bg-purple-400 rounded px-4 py-2 text-white">
                        로그인
                    </a>
                {/if}
            </div>
        </nav>

        {#if modalOpen}
            <div class="modal_container flex items-center justify-center fixed top-0 left-0 w-full h-full z-30 p-4">
                <div class="modal_content max-w-sm w-full rounded bg-white overflow-hidden shadow-lg relative z-10">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 ">제목 수정</div>
                        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                               type="text" placeholder="수정할 제목을 입력해 주세요." bind:value={inputTitle}/>
                    </div>
                    <div class="flex items-center justify-center mt-2">
                        <button
                                class="w-2/4 bg-gray-300 hover:bg-gray-200 focus:shadow-outline
              focus:outline-none py-2 px-4"
                                on:click={onClickModalClose}>
                            닫기
                        </button>
                        <button
                                class="w-2/4 bg-purple-500 hover:bg-purple-400
              focus:shadow-outline focus:outline-none text-white font-bold py-2
              px-4"
                                type="button"
                                on:click={onClickTitleModify}>
                            수정
                        </button>
                    </div>

                </div>
                <div class="modal_back drawer_back bg-gray-800 opacity-50 absolute left-0 top-0 w-full h-full "></div>
            </div>
        {/if}

        {#if drawerOpen}
            <div class="drawer_container fixed left-0 top-0 w-full h-full z-30">
                <ul class="drawer_ul bg-white relative h-screen z-10 py-4" transition:fly={{ x: -250, duration: 500 }}>
                    <li>
                        <a href="/" use:link use:active class="p-4 hover:bg-gray-200 block flex items-center" on:click={onClickDrawerClose}>
                            <div class="icon_box w-8 text-center mr-2">
                                <i class="fas fa-home"></i>
                            </div>
                            <span>home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/about" use:link use:active class="p-4 hover:bg-gray-200 block flex items-center" on:click={onClickDrawerClose}>
                            <div class="icon_box w-8 text-center mr-2">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <span>about</span>
                        </a>
                    </li>
                    <li>
                        <a href="/shop" use:link use:active class="p-4 hover:bg-gray-200 block flex items-center" on:click={onClickDrawerClose}>
                            <div class="icon_box w-8 text-center mr-2">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <span>shop</span>
                        </a>
                    </li>
                </ul>
                <div class="drawer_back bg-gray-800 opacity-50 absolute left-0 top-0 w-full h-full" on:click={onClickDrawerClose}></div>
            </div>
        {/if}
    </header>
{/if}
