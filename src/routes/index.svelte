<script context="module">
  export async function load({ session }) {
    return {
      props: {
        user: session.user,
      },
    };
  }
</script>

<script>
  export let user;
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
{#if user}
  <h2>Welcome {user}</h2>
  <form action="/logout">
    <button>Logout</button>
  </form>
{:else}
  <form action="/login">
    <button>Login using Github</button>
  </form>
{/if}
