<script context="module">
  //  protecting all pages that start with /admin/* in their path.
  export async function load({ page, session }) {
    console.log(page);
    if (page.path==='/admin' && session.user === "") {
      return { redirect: "/", status: 302 };
    }
    return { props: {} };

  }
</script>

<slot />
