<template>
  <form action="signup" class="signup">
    <div>
      <label for="email">Email :</label>
      <input type="text" id="email">
    </div>
    <div>
      <label for="password">Mot de passe :</label>
      <input type="text" id="password">
    </div>
    <button type="submit">S'inscrire</button>
  </form>
</template>

<style lang="scss" scoped>
  .signup {
    width: fit-content;
    margin: auto;
    margin-top: 3rem;
    label {
      color: white;
      display: block;
    }
    div {
      margin-top: .5rem;
    }
    button {
      margin-top: 1rem;
      cursor: pointer;
    }
  }
</style>
