<template>
  <div class="blocks_list_page_wrap">
    <!-- <div class="blocks_list_title_wrap">
      <p :class="blocksListPageWrap" style="margin-bottom:0;">
        <span class="blocks_list_title">{{listTitleName}}</span>
        <span class="blocks_list_page_wrap_hash_var">{{blocksValue}}</span>

        <span class="blocks_list_page_wrap_hash_var for_block"
              v-show="$route.query.block || $route.query.address">
          {{blockVar}}
        </span>
      </p>
    </div> -->

    <div :class="blocksListPageWrap">      
      <div class="pagination total_num">
        <div class="blocks_list_page_title">{{listTitleName}}</div>
        <!-- <span class="blocks_list_page_wrap_hash_title">Blocks</span> -->
        <span class="blocks_list_page_wrap_hash_var" v-show="['1','2','3','4'].includes(type)">{{count}} total</span>
        <!-- <b-pagination size="md" :total-rows="count" v-model="currentPage" :per-page="pageSize">
        </b-pagination> -->
      </div>
      <div style="position:relative;overflow-x: auto;-webkit-overflow-scrolling:touch;">
        <spin-component :showLoading="showLoading"/>
        <blocks-list-table :items="items" :type="this.$route.params.type"
                           :minWidth="tableMinWidth"
                           :showNoData="showNoData"></blocks-list-table>
        <div v-show="showNoData" class="no_data_show">
          No Data
        </div>
      </div>
      <div class="pagination" style='margin:0.2rem 0 0.5rem;'>
        <b-pagination size="md" :total-rows="count" v-model="currentPage" :per-page="pageSize">
        </b-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import Tools from '../common/Tools';
  import axios from 'axios';
  import BlocksListTable from './table/BlocksListTable.vue';
  import SpinComponent from './commonComponents/SpinComponent';

  export default {
    components:{
      BlocksListTable,
      SpinComponent,
    },
    watch: {
      currentPage(currentPage) {
        this.currentPage = currentPage;
        new Promise((resolve)=>{
          this.getDataList(currentPage, 30, this.$route.params.type);
          resolve();
        }).then(()=>{
          document.getElementById('router_wrap').scrollTop = 0;
        })

      },
      $route() {
        this.items = [];
        this.type = this.$route.params.type;
        this.currentPage = 1;
        this.getDataList(1, 30, this.$route.params.type);
        this.showNoData = false;
        switch (this.$route.params.type) {
          case '1': this.listTitleName = 'Blocks';
                  break;
          case '3': this.listTitleName = 'Validators';
                  break;
        };
        this.computeMinWidth();
      }
    },
    data() {
      return {
        devicesWidth: window.innerWidth,
        blocksListPageWrap: 'personal_computer_blocks_list_page',//1是显示pc端，0是移动端
        blocksValue: '',
        currentPage: 1,
        pageSize: 30,
        count: 0,
        fields: [],
        items: [],
        type: '1',
        titleVar: '',
        showNoData:false,//是否显示列表的无数据
        showLoading:false,
        blockVar:'',
        innerWidth : window.innerWidth,
        tableMinWidth:'',
        listTitleName:"",
      }
    },
    beforeMount() {
      this.type = this.$route.params.type;
      if (window.innerWidth > 910) {
        this.blocksListPageWrap = 'personal_computer_blocks_list_page_wrap';
      } else {
        this.blocksListPageWrap = 'mobile_blocks_list_page_wrap';
      }
    },
    mounted() {
      //组件页面根据路由类型判断是哪个页面
      this.getDataList(1, 30, this.$route.params.type);
      switch (this.$route.params.type) {
        case '1': this.listTitleName = 'Blocks';
          break;
        case '3': this.listTitleName = 'Validators';
          break;

      }
      window.addEventListener('resize',this.onresize);
      this.computeMinWidth();
    },
    beforeDestroy() {
      window.removeEventListener('resize',this.onWindowResize);
    },
    methods: {
      onresize(){
        this.innerWidth = window.innerWidth;
        if(window.innerWidth > 910){
          this.blocksListPageWrap = 'personal_computer_blocks_list_page_wrap';
        } else {
          this.blocksListPageWrap = 'mobile_blocks_list_page_wrap';
        }
      },
      //根绝页面的不同展示最小宽度,不换行显示列表
      computeMinWidth(){
        if(this.$route.params.type === '1'){
          this.tableMinWidth = 6.5;
        }else if(this.$route.params.type === '2' && this.$route.params.param === 'transfer'){
          this.tableMinWidth = 4.7;
        }else if(this.$route.params.type === '3' || this.$route.params.type === '4'){
          this.tableMinWidth = 6.1;
        }
      },
      getDataList(currentPage, pageSize, type) {
        this.showLoading = true;
        if (type === '1') {
          /*${this.$http_u}*/
          let url = `${this.$http_u}/api/blocks/${currentPage}/${pageSize}`;
          if(this.$route.query.address){
            url = `${this.$http_u}/api/blocks/precommits/${this.$route.query.address}/${currentPage}/${pageSize}`;
            this.listTitleName = `Precommit by ${this.$route.query.address}`;
          }
          axios.get(url).then((data) => {
            if (data.status === 200) {
              return data.data;
            }
          }).then((data) => {
            this.count = data.Count;
            if(data.Data && typeof data === "object"){
              this.items = data.Data.map(item => {
                let txn = item.NumTxs;
                let precommit = item.Block.LastCommit.Precommits.length;
                let [votingPower,denominator,numerator] = [0,0,0];
                item.Validators.forEach(listItem=>votingPower += listItem.VotingPower);
                item.Validators.forEach(item=>denominator += item.VotingPower);
                for(let i = 0; i < item.Block.LastCommit.Precommits.length; i++){
                  for (let j = 0; j < item.Validators.length; j++){
                    if(item.Block.LastCommit.Precommits[i].ValidatorAddress === item.Validators[j].Address){
                      numerator += item.Validators[j].VotingPower;
                      break;
                    }
                  }
                }
                return {
                  Height: item.Height,
                  Txn:txn,
                  // Fees: '0 IRIS',
                  Timestamp: Tools.conversionTimeToUTC(item.Time),
                  'Precommit Validators':precommit,
                  'Voting Power': denominator !== 0? `${(numerator/denominator).toFixed(2)*100}%`:'',
                };
              })
            }else{
              this.items = [{Height:'',Txn:'',Fee:'',Timestamp:'','Precommit Validators':'','Voting Power':''}]
              this.showNoData = true;
            }
            this.showLoading = false;
          }).catch(e => {
            console.log(e)
          })
        } else if (type === '2') {
          let url;
          let that = this;
          if(this.$route.params.param === 'transfer'){
            this.listTitleName = "Transfer";
            /*${this.$http_u}*/
            url = `${this.$http_u}/api/tx/trans/${currentPage}/${pageSize}`
          }else if(this.$route.params.param === 'stake'){
            this.listTitleName = "Stake";
            url = `${this.$http_u}/api/tx/stake/${currentPage}/${pageSize}`

          }else if(this.$route.params.param === 'declaration'){
            this.listTitleName = "Declaration";
            url = `${this.$http_u}/api/tx/declaration/${currentPage}/${pageSize}`
          }else if(this.$route.params.param === 'governance'){
            this.listTitleName = "Governance";
            url = `${this.$http_u}/api/tx/gov/${currentPage}/${pageSize}`
          }
          axios.get(url).then((data) => {
            if (data.status === 200) {
              return data.data;
            }
          }).then((data) => {
            this.count = data.Count;
            if(data.Data){
              this.items = data.Data.map(item => {
                let [Amount,Fee] = ['',''];
                if(that.$route.params.param === 'transfer' || that.$route.params.param === 'stake' || that.$route.params.param === 'governance'){
                  if(item.Amount !== null && item.Amount.length > 0){
                    // EDIT ===>>> 20181210 QIUTIAN
                    // item.Amount[0].amount = Tools.dealWithFees(item.Amount[0].amount);
                  }
                  if(item.Amount instanceof Array){
                    Amount = item.Amount.map(listItem=>`${listItem.amount} ${listItem.denom.toUpperCase()}`).join(',');
                    if(item.Type === 'CompleteUnbonding' || item.Type === 'BeginUnbonding' || item.Type === 'BeginRedelegate'){
                      Amount = item.Amount.map(listItem => `${listItem.amount}shares`).join(',');
                    }
                  }else if(item.Amount && Object.keys(item.Amount).includes('amount') && Object.keys(item.Amount).includes('denom')){
                    Amount = `${item.Amount.amount} ${item.Amount.denom.toUpperCase()}`;
                    if(item.Type === 'CompleteUnbonding' || item.Type === 'BeginUnbonding' || item.Type === "BeginRedelegate"){
                      Amount = `${item.Amount.amount}shares`;
                    }
                  }else if(item.Amount === null){
                    Amount = '';
                  }
                  if(item.Fee.amount && item.Fee.denom){
                    // EDIT ===>>> 20181210 QIUTIAN
                    // Fee = item.Fee.amount = Tools.formatFeeToFixedNumber(item.Fee.amount) + item.Fee.denom.toUpperCase();
                    Fee = item.Fee.amount = item.Fee.amount + item.Fee.denom.toUpperCase();

                  }
                }
                let objList;
                if(that.$route.params.param === 'transfer'){
                  objList = {
                    TxHash: item.Hash,
                    Block:item.BlockHeight,
                    From:item.From?item.From:(item.DelegatorAddr?item.DelegatorAddr:''),
                    To:item.To?item.To:(item.ValidatorAddr?item.ValidatorAddr:''),
                    Amount,
                    Fee,
                    Timestamp: Tools.conversionTimeToUTC(item.Timestamp),
                  };
                }else if(that.$route.params.param === 'declaration'){
                  objList = {
                    TxHash: item.Hash,
                    Block: item.BlockHeight,
                    Owner: item.Owner ? item.Owner : "--",
                    Moniker: item.Moniker ? item.Moniker : "--",
                    "Self-Bond": item.SelfBond && item.SelfBond.length > 0 ? Tools.dealWithFees(item.SelfBond[0].amount) + item.SelfBond[0].denom.toUpperCase() : "--",
                    Type: item.Type,
                    Fee: Tools.dealWithFees(item.Fee.amount) + item.Fee.denom.toUpperCase(),
                    Timestamp: Tools.conversionTimeToUTC(item.Timestamp),
                  }
                }else if(that.$route.params.param === 'stake'){
                  objList = {
                    TxHash: item.Hash,
                    Block:item.BlockHeight,
                    From:item.From?item.From:(item.DelegatorAddr?item.DelegatorAddr:''),
                    To:item.To?item.To:(item.ValidatorAddr?item.ValidatorAddr:''),
                    Type:item.Type === 'coin'?'transfer':item.Type,
                    Amount,
                    Fee,
                    Timestamp: Tools.conversionTimeToUTC(item.Timestamp),
                  }
                }else if(that.$route.params.param === 'governance'){
                  objList = {
                    TxHash: item.Hash,
                    Block:item.BlockHeight,
                    From:item.From?item.From:(item.DelegatorAddr?item.DelegatorAddr:''),
                    "Proposal_ID": item.ProposalId === 0 ? "--" : item.ProposalId,
                    Type: item.Type,
                    Fee,
                    Timestamp: Tools.conversionTimeToUTC(item.Timestamp),
                  }
                }

                return objList;
              })
            }else{
              if(that.$route.params.param === 'transfer'){
                this.items = [{
                  TxHash: '',
                  Block:'',
                  From:'',
                  To:'',
                  Amount:'',
                  Fee:'',
                  Timestamp:'',
                }];
              }else if(that.$route.params.param === 'declaration'){
                this.items = [{
                  TxHash: '',
                  Block:'',
                  Owner:'',
                  Moniker:'',
                  "Self-Bond":'',
                  Type:'',
                  Fee:'',
                  Timestamp:'',
                }];
              }else if(that.$route.params.param === 'stake'){
                this.items = [{
                  TxHash: '',
                  Block:'',
                  From:'',
                  To:'',
                  Type:'',
                  Amount:'',
                  Fee:'',
                  Timestamp:'',
                }];
              }else if(that.$route.params.param === 'governance'){
                this.items = [{
                  TxHash: '',
                  Block:'',
                  From:'',
                  "Proposal_ID":'',
                  Type:'',
                  Fee:'',
                  Timestamp:'',
                }];
              }

              that.showNoData = true;
            }
            that.showLoading = false;
          })
        }else if (type === '3' || type === '4') {
          let url = `${this.$http_u}/api/stake/candidates/${currentPage}/${pageSize}`;
          axios.get(url).then((data) => {
            if (data.status === 200) {
              return data.data;
            }
          }).then((data) => {
            this.count = data.Count;
            if(data.Candidates && typeof data === "object"){
              this.items = data.Candidates.map(item => {
                return {
                  Address: item.Address,
                  Name:Tools.getShortForm(item.Description.Moniker,20,"..."),
                  'Voting Power':`${(item.VotingPower/data.PowerAll*100).toFixed(2)}%`,
                  'Uptime':`${item.Uptime}%`,
                  'Commission Rate':'',
                  Returns:'',
                };
              })
            }else{
              this.showNoData = true;
              this.items = [{
                Address: '',
                Name:'',
                'Voting Power':'',
                'Uptime':'',
                'Commission Rate':'',
                Returns:'',
              }]
            }
            this.showLoading = false;
          }).catch(e => {
            console.log(e)
          })
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin.scss';

  .blocks_list_page_wrap {
    @include flex;
    @include pcContainer;
    font-size: 0.14rem;
    background:#f5f5f5;
    .pagination {
      @include flex;
      justify-content: flex-end;
      @include borderRadius(0.025rem);
      height:0.4rem;
      border:0;
      li{
        height:0.4rem !important;
      }
    }
    .total_num{
      @include flex;
      flex-direction:column;
      justify-content: center;
      height:1.25rem;
      text-indent:0.3rem;
    }
    .no_data_show{
      @include flex;
      justify-content: center;
      border-top:0.01rem solid #eee;
      border-bottom:0.01rem solid #eee;
      font-size:0.14rem;
      height:3rem;
      align-items: center;
    }
    .b-table {
      //min-width: 8rem;

      a {
        text-decoration: none;
      }
    }
    .blocks_list_title_wrap {
      width: 100%;
      border-bottom: 1px solid #d6d9e0 !important;
      @include flex;
      @include pcContainer;
      height:0.62rem;
      background:#efeff1;      
      p{
        height:0.62rem;
        span{
          height:0.62rem;
      line-height:0.62rem;
        }
      }
      .personal_computer_blocks_list_page_wrap {
        @include flex;

      }
      .mobile_blocks_list_page_wrap {
        @include flex;
        flex-direction: column;
        overflow-x: auto;
        -webkit-overflow-scrolling:touch;
        width:100%;
        .blocks_list_page_wrap_hash_var{
          min-width:7rem;
        }
      }

    }
    .personal_computer_blocks_list_page_wrap {
      .transaction_information_content_title {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        color: #000000;
        margin-bottom: 0;
      }
      @include pcCenter;
      min-height:4.6rem;
      position:relative;
      top:-25px;
      background:#fff;
      border-radius:10px;
      .transactions_detail_information_wrap {
        .information_props_wrap {
          @include flex;
          .information_props {
            width: 15rem;
          }
        }
      }

      .blocks_list_title {
        height: 0.62rem;
        line-height: 0.62rem;
        font-size: 0.22rem;
        color: #000000;
        margin-right: 0.2rem;
        font-weight: 500;
      }
      .blocks_list_page_title{
        line-height: 1.5;
        font-size: 0.24rem;
        color: #333;
      }
      .blocks_list_page_wrap_hash_var {        
        line-height: 1.5;
        font-size: 0.14rem;
        color: #666;
      }
      .for_block{
        display:inline-block;
        margin-left:0.1rem;
      }
    }

    .mobile_blocks_list_page_wrap {
      width: 100%;
      @include flex;
      flex-direction: column;
      padding: 0 0.1rem;
      .transaction_information_content_title {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.18rem;
        color: #000000;
        margin-bottom: 0;
      }
      .transactions_detail_information_wrap {

        .information_props_wrap {
          @include flex;
          flex-direction: column;
          border-bottom: 0.01rem solid #eee;
          margin-bottom: 0.05rem;
          .information_value {
            overflow-x: auto;
            -webkit-overflow-scrolling:touch;
          }

        }
      }

      .blocks_list_title {
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.18rem;
        color: #000000;
        margin-right: 0.2rem;
        font-weight: 500;
      }
      .blocks_list_page_wrap_hash_var {
        overflow-x: auto;
        -webkit-overflow-scrolling:touch;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.18rem;
        color: #a2a2ae;
      }
      .for_block{
        display:inline-block;
        //margin-left:0.1rem;
      }

    }
  }

  //重置bootstrap-vue的表格样式
  table{

    td{
      max-width:2.2rem !important;
      overflow-wrap: break-word !important;
    }
  }
  .page-item{
    &:first-child, &:last-child{
      .page-link{
        @include borderRadius(0.025rem);
        border:0!important;
      }
    }
  }
  .pagination{
    .pagination{
      padding:0 1.0rem 0 0;
      border:0;
    }
  }
  .page-link{
    border:0!important;
    &:hover{
      background-color:transparent;
    }
  }

</style>
