<script context="module">
  //  protecting all pages that start with /admin/* in their path.
  export async function load({ url, session }) {

    if (url.pathname === '/admin' && !session.user) {
      return { redirect: "/", status: 302 };
    }
    return { props: {} };

  }
</script>

<slot />
