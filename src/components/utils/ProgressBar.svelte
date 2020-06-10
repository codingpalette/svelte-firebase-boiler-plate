<script>


</script>

<style>

    .progress_bar{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 3px;
        background-color: rgba(0,0,0,0.5);
        z-index: 50;
    }
    .progress_bar:before{
        content: '';
        display: block;
        position: absolute;
        left: -30%;
        top: 0;
        width: 30%;
        height: 3px;
        background-color: #f43e04;
        animation-duration: 1s;
        animation-name: slider;
        animation-iteration-count: infinite;
        animation-timing-function:linear;
    }

    @keyframes slider {
        from {
            left: -30%;
        }

        to {
           left: 100%;
        }
    }

</style>


<div class="progress_bar"></div>
