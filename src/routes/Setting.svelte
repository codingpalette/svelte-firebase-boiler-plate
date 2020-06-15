<script>
    import {userState} from "../store/UserStore";
    import {onMount} from "svelte";
    import {link, push} from "svelte-spa-router";

    import SectionLayout from '../components/layout/SectionLayout.svelte';
    import InputGroup from '../components/utils/InputGroup.svelte';
    import Button from '../components/utils/Button.svelte';

    onMount(() => {
        if ($userState.level !== 0) {
            push("/");
        }
    });

    onMount(() => {
        console.log($userState)
    });


    function addressEvent() {
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                const roadAddr = data.roadAddress; // 도로명 주소 변수
                let extraRoadAddr = ""; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraRoadAddr +=
                            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraRoadAddr !== "") {
                    extraRoadAddr = " (" + extraRoadAddr + ")";
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                console.log(roadAddr)
                // addressList.postcode = data.zonecode;
                // addressList.road = roadAddr;
                // addressList.jibun = data.jibunAddress;
            }
        }).open();
    }

</script>

<style>


</style>

<SectionLayout Title="내프로필" subTitle="내프로필을 수정할 수 있습니다.">
    <div class="profile_form_area">
        <div class="pf_img_area">

        </div>
        <div class="pf_input_area">
            <InputGroup labelTxt="이름" idValue="name" valueData=""/>
        </div>
        <div class="pf_input_area">
            <div class="pb-4">
                <Button clickEvent={addressEvent}>주소찾기</Button>
            </div>
            <InputGroup labelTxt="주소" idValue="road" valueData=""/>
            <InputGroup labelTxt="상세주소" idValue="road_detail" valueData=""/>
            <InputGroup labelTxt="우편번호" idValue="postcode" valueData=""/>
        </div>
        <div class="btn_box flex items-center justify-center">
            <a
                href="/"
                use:link
                class="mr-1 leading-normal bg-transparent hover:bg-black text-xs text-black text-opacity-75 hover:text-white px-4 py-2 border border-gray-500 hover:border-transparent focus:shadow-none focus:outline-none rounded-sm"
            >
                취소
            </a>
            <Button >수정</Button>
        </div>




    </div>



</SectionLayout>