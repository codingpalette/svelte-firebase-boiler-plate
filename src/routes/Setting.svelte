<script>
    import {userState} from "../store/UserStore";
    import {onMount} from "svelte";
    import {link , push} from "svelte-spa-router";

    import SectionLayout from '../components/layout/SectionLayout.svelte'

    onMount(() => {
        if ($userState.level !== 0) {
            push("/");
        }
    });

    onMount(() => {
        console.log($userState)
    })

</script>

<style>


</style>

<SectionLayout Title="내프로필" subTitle="내프로필을 수정할 수 있습니다.">
    <div class="profile_form_area">
        <div class="pf_img_area">

        </div>
        <div class="pf_input_area">
            <div class="pf_input  pb-12">
                <div class="label">이름</div>
                <div class="input">
                    <input type="text" placeholder="이름을 입력해주세요">
                </div>
            </div>
            <div class="pf_input pb-12">
                <div class="label">이름</div>
                <div class="input">
                    <input type="text" placeholder="이름을 입력해주세요">
                </div>
            </div>
        </div>
    </div>


</SectionLayout>