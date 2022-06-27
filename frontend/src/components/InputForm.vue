<template>
  <div class="input-form">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :id="name"
      v-model="value"
      @keyup="sendValue"
      :placeholder="placeholder"
    />
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    label: String,
    type: String,
    error: String,
    placeholder: String,
  },
  data: () => {
    return {
      value: "",
    };
  },
  methods: {
    sendValue() {
      this.$emit("showInput", {
        value: this.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/styles.scss";

.input-form {
  width: fit-content;
  margin: auto;
  text-align: justify;
  margin-bottom: 1rem;

  label,
  input {
    display: block;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  input {
    width: 300px;
    font-size: 1rem;
    height: 2rem;
    padding: 0.5rem;
    border: none;
    border-radius: 20px;

    &:focus-visible,
    &:hover {
      outline: 3px solid green;
    }
  }

  .error {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: red;
  }
}
</style>
