<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="userInfo"
      sort-by="userId"
      class="elevation-1"
      @page-count="pageCount = $event"
      :page.sync="page"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>회원 관리</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.user_id"
                        label="userId"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.user_pwd"
                        label="userPwd"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.user_name"
                        label="userName"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.manager"
                        label="manager"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.manager`]="{ item }">
        <v-switch
          color="indigo darken-3"
          v-model="item.manager"
          hide-details
        ></v-switch>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <!-- 회원정보 수정 Dialog -->
    <template>
      <div id="search-pwd">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-text class="float-right" dark v-bind="attrs" v-on="on">
              비밀번호 찾기
            </v-text>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">비밀번호 찾기</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="ID"
                      v-model="userInfo.userId"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="이름"
                      type="text"
                      v-model="userInfo.userName"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Email"
                      v-model="userInfo.emailId"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="userInfo.emailDomain"
                      :items="[
                        'google.com',
                        'naver.com',
                        'daum.net',
                        'hanmail.net',
                        'ssafy.com',
                        'kakao.com',
                      ]"
                      label="Domains"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn style="color: #222831" text @click="searchPwd()">
                Search Pwd
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import http from "@/util/http";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    headers: [
      { text: "아이디", value: "userId", sortable: false },
      { text: "비밀번호", value: "userPwd", sortable: false },
      { text: "이름", value: "userName", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "관리자", value: "manager" },
      { text: "정보수정", value: "actions", sortable: false },
    ],
    userInfo: [],
    editedIndex: -1,
    editedItem: {
      user_id: "",
      user_pwd: 0,
      user_name: 0,
      email: 0,
      manager: false,
    },
    currentItem: {
      user_id: "",
      user_pwd: 0,
      user_name: 0,
      email: 0,
      manager: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    this.initialize();
    try {
      let { data } = await http.get("/admin/manage");
      let users = data;
      for (let user of users) {
        let isManage = true;
        if (user.manager === "F") isManage = !isManage;
        let newUser = {
          userId: user.userId,
          userPwd: user.userPwd,
          userName: user.userName,
          email: user.emailId + "@" + user.emailDomain,
          manager: isManage,
        };
        this.userInfo.push(newUser);
      }

      console.log(this.userInfo);
    } catch (error) {
      alert("유저정보 불러오기 실패");
    }
  },

  methods: {
    initialize() {
      this.userInfo = [];
    },

    editItem(item) {
      console.log(item);
      this.editedIndex = this.userInfo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userInfo.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.userInfo.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.currentItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.currentItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.userInfo.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.v-data-footer {
  display: none;
}
</style>
