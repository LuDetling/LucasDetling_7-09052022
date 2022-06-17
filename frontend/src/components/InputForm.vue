<template>
  <div class="formulaire">
    <label :for="name">{{ label }}</label>
    <input :type="type" :id="name" v-model="value" @keyup="sendValue" />
    <div>{{ error }}</div>
  </div>
</template>

<script>

export default {
  props: {
    name: String,
    label: String,
    type: String,
    error: String,
    input: String,
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
.formulaire {
  width: fit-content;
  margin: auto;
  text-align: justify;
  > div {
    margin-bottom: 1rem;
    label,
    input {
      display: block;
    }
  }
  button {
    display: block;
    margin: auto;
  }
  .button-disabled {
    pointer-events: none;
  }
}
</style>
