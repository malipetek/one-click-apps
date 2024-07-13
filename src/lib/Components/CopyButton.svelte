<script>
  let toast = {open: false};
  import { copy } from 'svelte-copy';
  import { Toast } from 'flowbite-svelte';
  export let content = '';
</script>
<div type="button" class="relative text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      use:copy={content}
      on:svelte-copy={() => {toast.open = true, setTimeout(() => toast.open = false, 2000)}}
    >copy
  <Toast toastStatus={toast.open} divClass="absolute bottom-full z-50 bg-primary px-4 py-2 rounded-lg" >
    <p> Copied </p>
  </Toast>
</div>