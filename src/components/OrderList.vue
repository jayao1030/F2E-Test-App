<template>
  <div class="container">
    <div class="list">
      <div class="status">
        <div class="status-type">進行中</div>
      </div>
      <div v-for="order in filterProgress" :key="order.date">
        <div class="item">
          <div class="item-left">
            <img :src="order.logo" class="logo" />
          </div>
          <div class="item-content">
            <div class="item-info">
              <div class="item-info-status">
                {{ order.status.type }}
              </div>
              預計出貨 : {{ order.date }}
            </div>
            <p>{{ order.name }}</p>
          </div>
          <div class="item-right">
            <div class="arrow right" />
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="status completed">
        <div class="status-type">已完成</div>
      </div>
      <div v-for="order in filterComplete" :key="order.date">
        <div class="item">
          <div class="item-left">
            <img class="logo completed" :src="order.logo" />
          </div>
          <div class="item-content">
            <div class="item-info">
              {{ order.status.type }}
            </div>
            <p>{{ order.name }}</p>
          </div>
          <div class="item-right">
            <div class="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  computed: {
    showData() {
      return this.$store.state.orders;
    },
    filterProgress() {
      return this.showData
        .filter((item) => item.status.code <= 2)
        .sort((a, b) => {
          return a.sortTimes < b.sortTimes ? 1 : null;
        });
    },
    filterComplete() {
      return this.showData
        .filter((item) => item.status.code >= 3)
        .sort((a, b) => {
          return a.sortTimestamp < b.sortTimestamp ? 1 : null;
        });
    },
  },
  mounted() {
    this.$store.dispatch("getData");
  },
};
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  max-width: 100%;
  margin: auto;
}

.status {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid #e5e5e5;
  border-top: none;
  background: #f5f5f5;
  padding: 20px 30px;
  box-sizing: border-box;

  .status-type {
    margin: 0 15px;
    font-size: 20px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 30px;
      background-color: #009f49;
      margin: auto;
      height: 25px;
      width: 6px;
    }
  }
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 25px 30px;
  width: 100%;
  border: 2px solid #e5e5e5;
  border-top: 0;

  .logo {
    height: 100px;
    width: 100px;
    margin: 5px 0;
  }

  .completed {
    opacity: 0.5;
  }

  .item-content {
    flex: 1 ;
    padding: 0 30px;

    .item-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      font-size: 20px;
      font-weight: 500;

      .item-info-status {
        color: #049d4d;
      }
    }

    p {
      text-align: left;
      font-size: 20px;
    }
  }
}

.item-right {
  display: flex;
  align-items: center;
  justify-content: center;

  .arrow {
    border: solid #a7a7a7;
    border-width: 0 2px 2px 0;
    padding: 8px;
    transform: rotate(-45deg);
    cursor: pointer;
  }
}
</style>