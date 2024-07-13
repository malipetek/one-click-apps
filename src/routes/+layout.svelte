<script>
  import '../app.css';
  import { DarkMode } from 'flowbite-svelte';

</script>
<nav class="bg-primary-light border-primary-200 dark:bg-primary">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://caprover.com/img/logo.png" class="h-8" alt="Caprover logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">Muhammet Ali Petek</span>
  </a>
  <div class="flex md:order-2">  
    <DarkMode class="p-2 ml-2 text-primary-500 dark:text-primary-600 border dark:border-primary-800 hover:bg-primary-dark dark:hover:bg-primary-dark" />
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
      <div class="relative mt-3 md:hidden">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-primary-500 dark:text-primary-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-primary-900 border border-primary-300 rounded-lg bg-primary-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search...">
      </div>
    </div>
  </div>
</nav>
<main class="bg-primary dark:bg-primary-dark p-4">
  <slot />
</main>