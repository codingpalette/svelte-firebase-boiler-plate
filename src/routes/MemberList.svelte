<script>
    import {onMount} from "svelte";
    import SectionLayout from '../components/layout/SectionLayout.svelte'

    let members = []

    onMount(async () =>{
        const res = await firebase.firestore().collection("users").orderBy("createdAt", "desc").limit(20).get();
        console.log(res.docs)

        members = res.docs.map(e => e.data())
        console.log(members)
    })

</script>

<style>
    .member_table {
        width: 100%;
    }

    .member_table thead th {
        padding: 8px 24px;
        font-size: 12px;
        text-align: left;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .member_table tbody tr:hover {
        background: #f5f5f5;
    }

    .member_table tbody td {
        color: rgba(0, 0, 0, 0.54);
        font-size: 13px;
        line-height: 16px;
        height: 48px;
        padding: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        white-space: nowrap;
    }
    .member_table tbody td .wrapper{
        width: inherit;
        position: relative;
        z-index: 4;
        padding: 10px 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>


<SectionLayout Title="회원정보" subTitle="회원 리스트가 나옵니다.">
    {#if members.length >= 1}
        <div class="w-full rounded overflow-hidden shadow-lg">
            <table class="member_table">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>사진</th>
                    <th>사용자 uid</th>
                    <th>&nbsp</th>
                </tr>
                </thead>
                <tbody>
                {#each members as list}
                    <tr>
                        <td>
                            <div class="wrapper">
                                {list.displayName}
                            </div>

                        </td>
                        <td>
                            <div class="wrapper">
                                {list.email}
                            </div>

                        </td>
                        <td>
                            <div class="wrapper">
                                <div class="image_box h-10 w-10 flex items-center justify-center overflow-hidden rounded-full">
                                    <img src="{list.photoURL}" alt="">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="wrapper">
                                {list.uid}
                            </div>
                        </td>
                        <td>
                            <div class="">
                                아이디 테스트
                            </div>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    {/if}
</SectionLayout>

