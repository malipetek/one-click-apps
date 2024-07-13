<script>
  import apps from '$lib/one-click-apps';
  let filteredApps = {...apps};
  import { Modal } from 'flowbite-svelte';
  import { search} from 'fast-fuzzy';
  import CopyButton from '$lib/Components/CopyButton.svelte';
	import debounce from "debounce";

  let defaultModal = false;
  let selectedApp = {};
  let searchText = '';
  
  const find = debounce(_find, 1000);
  $: if(searchText) {
    find(searchText);
  } else {
    filteredApps = {...apps};
  }
  
  function _find(q) {
    filteredApps = search(q, Object.entries(apps), {
      keySelector: ([name]) => name
    }).reduce((acc, [name, app]) => {
      acc[name] = app;
      return acc;
    }, {});
  }
</script>

<h1 class="text-2xl font-semibold text-primary-900 dark:text-white"> One-Click-Apps </h1>

<div class="p-4 mb-4 text-sm text-primary-800 rounded-lg bg-primary-300 dark:bg-primary-800 dark:text-primary-400" role="alert">
  <input type="text" value="https://malipetek.dev/one-click-apps" aria-label="one click apps registry url" class="mb-6 bg-primary-100 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-primary-400 dark:focus:ring-primary-500 dark:focus:border-primary-500">
  <div class="flex items-center space-x-2 mt-2">
  <span> Click to copy url and add it to your one click apps page </span>
  <CopyButton content="https://malipetek.dev/one-click-apps" /></div>
</div>
<div class="relative md:block py-4 ">
  <div class="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
    <svg class="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
    <span class="sr-only">Search icon</span>
  </div>
  <input type="text" bind:value={searchText} id="search-navbar" class="block w-full p-2 ps-10 text-sm text-primary-900 border border-primary-300 rounded-lg bg-primary-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search...">

</div>  

<div class="grid grid-cols-2 gap-1 md:gap-3">
  {#each Object.entries(filteredApps) as [name, app]}
    <div class="p-4 bg-primary-300 rounded-lg shadow-md dark:bg-primary-800">
      <div class="flex items center justify-between flex-col">
        <div class="flex items-center flex-col">
          <img class="w-10 h-10 rounded-full" src={app.logo} alt={name} />
          <div class="ml-2">
            <span class="block text-lg font-semibold text-primary-900 dark:text-white">{name}</span>
            </div>
          </div>
          <button class="px-4 py-2 text-sm text-white bg-primary-500 rounded-lg dark:bg-primary-600" 
                  on:click={e => {
                    defaultModal = true;
                    selectedApp = {
                        name: name,
                        ...app
                      }
                    }}>
                  See the yaml</button>
        </div>
      </div>
  {:else}
  <div class="p-4 bg-primary-300 rounded-lg shadow-md dark:bg-primary-800">
    <p class="text-primary-900 dark:text-white">No app found</p>
  </div>
  {/each}
</div>

<Modal title={selectedApp.name} bind:open={defaultModal} autoclose color="primary" bodyClass="bg-primary-300 dark:bg-primary-800 p-4" classHeader="dark:bg-primary-800 bg-primary-300" footerClass="dark:bg-primary-800 bg-primary-300 text-primary-800 dark:text-primary-400 border-primary-500 dark:border-primary-200 divide-primary-500 dark:divide-primary-200 flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse rounded-b-lg">
  <textarea bind:value={selectedApp.content} rows="20" class="block p-2.5 w-full text-sm text-primary-900 bg-primary-50 rounded-lg border border-primary-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write your thoughts here..."></textarea>
  <svelte:fragment slot="footer">
    <CopyButton content={selectedApp.content} />
  </svelte:fragment>
</Modal>


