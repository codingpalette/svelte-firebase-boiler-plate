<script>
    import {userState} from "../store/UserStore";
    import {errorState} from "../store/SiteStore";
    import {onMount} from "svelte";
    import {push} from "svelte-spa-router";

    import SectionLayout from '../components/layout/SectionLayout.svelte';
    import InputGroup from '../components/utils/InputGroup.svelte';
    import Button from '../components/utils/Button.svelte';
    import Error from "../components/Error.svelte";


    onMount(() => {
        if (!$userState.level) {
            push("/");
        }
    });

    onMount(() => {
        // console.log($userState)
    });


    let btnloading = false;


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
                // console.log(roadAddr)
                $userState.address.road = roadAddr;
                $userState.address.postcode = data.zonecode;

                // addressList.postcode = data.zonecode;
                // addressList.road = roadAddr;
                // addressList.jibun = data.jibunAddress;
            }
        }).open();
    }

    const onClickSettingSave = async () => {

        if ($userState.displayName.trim() === '') {
            $errorState = {
                open: true,
                errorMessage: "이름을 입력해 주세요."
            };
            return false;
        }

        btnloading = true
        try {
            // console.log($userState)
            await firebase.firestore().collection('users').doc($userState.uid).update({
                displayName: $userState.displayName,
                address: {
                    road: $userState.address.road,
                    road_detail: $userState.address.road_detail,
                    postcode: $userState.address.postcode,
                }
            })
        } catch (e) {
            console.log('e')
        } finally {
            btnloading = false
        }
    }

</script>

<style>


</style>


<SectionLayout Title="내프로필" subTitle="내프로필을 수정할 수 있습니다.">
    <div class="profile_form_area">
        <div class="pf_img_area">

        </div>
        <div class="pf_input_area">
            <InputGroup labelTxt="이름" idValue="name" bind:valueData="{$userState.displayName}"/>
        </div>
        <div class="pf_input_area">
            <div class="pb-4">
                <Button clickEvent={addressEvent} mode="btn">주소찾기</Button>
            </div>
            <InputGroup labelTxt="주소" idValue="road" bind:valueData="{$userState.address.road}"/>
            <InputGroup labelTxt="상세주소" idValue="road_detail" bind:valueData="{$userState.address.road_detail}"/>
            <InputGroup labelTxt="우편번호" idValue="postcode" bind:valueData="{$userState.address.postcode}"/>
        </div>
        <div class="btn_box flex items-center justify-center">
            <Button mode="link" href="/">취소</Button>
            <Button
                    clickEvent="{onClickSettingSave}"
                    btnloading="{btnloading}"
            >
                수정
            </Button>
        </div>
    </div>
</SectionLayout>

<Error backcolor="red"/>