<script>
    import ResetScrollY from '../components/utils/ResetScrollY.svelte';

    let aboutImg01 = "images/about_img01-1.jpg";
    let aboutImg02 = "images/about_img02-1.jpg";
    let aboutImg03 = "images/about_img03-1.jpg";
    let backImg = "images/about_img04-1.jpg";
</script>

<style>
    .title_box .title:after {
        content: "";
        position: absolute;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
        width: 20%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.125);
    }
    .image_box .content {
        width: 100%;
    }
    .image_box .photo_box:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    .image_box .photo_box {
        position: relative;
    }
    .image_box .photo_box img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .image_box .text_box {
        padding: 4rem 1rem;
    }
    @media screen and (min-width: 768px) {
        .image_box .content {
            width: 50%;
        }
        .image_box > div:nth-child(odd) .photo_box {
            order: 1;
        }
        .image_box > div:nth-child(odd) .text_box {
            order: 2;
        }
        .image_box > div:nth-child(even) .photo_box {
            order: 2;
        }
        .image_box > div:nth-child(even) .text_box {
            order: 1;
        }

        .image_box .text_box {
            padding: 0 4rem;
        }
    }
</style>

<ResetScrollY />





<section class="about_content z-20">
    <div class="photo_overlay fixed inset-0 bg-cover bg-center" style="background-image: url('{backImg}')" />
    <div class="content relative max-w-screen-lg ml-auto mr-auto px-4 z-10">
        <h3 class="text-white text-center text-5xl font-bold my-12">About</h3>
        <div class="rounded-md shadow-lg overflow-hidden">
            <div class="title_box bg-white py-10 px-4">
                <strong class="title text-center pb-3 mb-3 text-2xl block relative">
                    Contrary to popular belief
                </strong>
                <p class="text-center text-black text-opacity-50">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
            <div class="py-12 px-6 bg-gray-100">
                <p class="mb-8 text-black text-opacity-50">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
                    cumque ad eaque omnis exercitationem excepturi itaque blanditiis
                    necessitatibus hic sequi asperiores aut ipsum alias consectetur nulla
                    tempora, quas corrupti repellendus.
                </p>
                <p class="text-black text-opacity-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                    praesentium nemo, dolores quibusdam cumque voluptatem obcaecati optio
                    eum perspiciatis sapiente placeat esse quo, veritatis maiores suscipit
                    assumenda. Laborum nam, neque consequatur repudiandae necessitatibus,
                    quia consequuntur alias, commodi quasi autem deserunt?
                </p>
            </div>
            <div class="image_box">
                <div class="flex items-center justify-center bg-white flex-wrap">
                    <div class="content photo_box">
                        <img src={aboutImg01} alt="" />
                    </div>
                    <div class="content text_box">
                        <strong class="title text-black text-xl mb-4 block">
                            Lorem, ipsum dolor.
                        </strong>
                        <p class="txt text-black text-opacity-50">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Laudantium vel saepe adipisci tempore blanditiis ipsa perspiciatis
                            minus asperiores suscipit aut!
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center bg-gray-900 flex-wrap">
                    <div class="content photo_box">
                        <img src={aboutImg02} alt="" />
                    </div>
                    <div class="content text_box">
                        <strong class="title text-white text-xl mb-4 block">
                            Lorem, ipsum dolor.
                        </strong>
                        <p class="txt text-white text-opacity-50">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                            nobis?
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center bg-white flex-wrap">
                    <div class="content photo_box">
                        <img src={aboutImg03} alt="" />
                    </div>
                    <div class="content text_box">
                        <strong class="title text-black text-xl mb-4 block">
                            Lorem, ipsum dolor.
                        </strong>
                        <p class="txt text-black text-opacity-50">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Laudantium vel saepe adipisci tempore blanditiis ipsa perspiciatis
                            minus asperiores suscipit aut!
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </div>

</section>


