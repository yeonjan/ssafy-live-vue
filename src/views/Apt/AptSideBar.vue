<template>
  <v-card id="aptInfoCard" class="mx-auto" max-width="100%" height="100vh" tile>
    <v-list flat>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <!-- <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title v-text="item.text" id="aptInfo-list"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
// import { get } from "http";

export default {
  data() {
    return {
      selectedItem: null,
      aptDetailInfo: {},
    };
  },
  computed: {
    items() {
      let newArray = this.$store.state.aptStore.aptInfo.map((el) => {
        return { text: el.apartmentName };
      });
      console.log(newArray);
      return newArray;
    },
  },
  beforeDestroy() {
    console.log(this.$store);
    this.$store.commit("aptStore/SET_APTINFO", { aptInfo: [] });
  },
};
</script>

<style>
#aptInfoCard {
  overflow: auto;
}
</style>
