<script>
    import {onMount} from "svelte";
    import {siteOk} from "../../store/SiteStore";
    import {userState} from "../../store/UserStore";

    const getUser = async user => {
        // console.log(user);
        // const { claims } = await user.getIdTokenResult();
        const getToken = await user.getIdTokenResult();
        // console.log(getToken);
        const res = await firebase.firestore().collection("users").doc(`${getToken.claims.user_id}`).get();
        // console.log(res.data())
        // console.log(res)
        $userState = res.data();
        // console.log($userState)
        $siteOk = true;
    };

    // Client 환경에서 동작하도록 `onMount` 훅에서 실행합니다.
    onMount(() => {
        // 로그인 사용자의 상태 변환(로그인, 로그아웃)에 따라 콜백을 실행합니다.
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // 쓰기 가능한 객체이기 때문에 바로 사용자를 할당할 수 있습니다.
                getUser(user);
            } else {
                // 사용자가 없는 경우 초기화합니다.공
                $userState = null;
                $siteOk = true;
            }
        });
    });
</script>
