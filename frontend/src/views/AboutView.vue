<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
const showUser = async () => {
  const response = await fetch("http://localhost:3001/auth/users");
  if (!response.ok) {
    console.log(
      "Network request for products.json failed with response " +
        response.status +
        ": " +
        response.statusText
    );
    return;
  }
  const resUsers = await response.json();  
  const users = resUsers.users;

  for (const user of users) {
    console.log(user);
  }
};
showUser();
</script>
