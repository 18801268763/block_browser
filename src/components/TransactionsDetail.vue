<template>
  <div class="transactions_detail_wrap">
    <div class="transactions_title_wrap">
      <p :class="transactionsDetailWrap" style="margin-bottom:0;">
        <span class="transactions_detail_title">Transaction</span>
        <span class="transactions_detail_wrap_hash_var">{{hashValue}}</span>
      </p>
    </div>
    <div :class="transactionsDetailWrap">      
      <div class="transactions_detail_information_wrap">
        <p class="transaction_information_content_title">Transaction Information</p>
        <div class="information_props_wrap">
          <span class="information_props">TxHash:</span>
          <span class="information_value">{{hashValue}}</span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Block Height:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/blocks_detail/${blockValue}`)">{{blockValue}}</span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Type:</span>
          <span class="information_value">{{typeValue}}</span>
        </div>
        <div class="information_props_wrap" v-if="showProposer">
          <span class="information_props">Proposer:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/address/1/${proposer}`)">{{proposer}}</span>
        </div>
        <div class="information_props_wrap" v-if="title">
          <span class="information_props">ProposalTitle:</span>
          <span class="information_value">{{title}}</span>
        </div>
        <div class="information_props_wrap" v-if="proposalType">
          <span class="information_props">ProposalType:</span>
          <span class="information_value">{{proposalType}}</span>
        </div>
        <div class="information_props_wrap" v-if="showInitialDeposit">
          <span class="information_props">InitialDeposit:</span>
          <span class="information_value">{{initialDeposit}}</span>
        </div>
        <div class="information_props_wrap" v-if="description">
          <span class="information_props">Description:</span>
          <span class="information_value">{{description}}</span>
        </div>
        <div class="information_props_wrap" v-if="depositer">
          <span class="information_props">Depositer:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/address/1/${depositer}`)">{{depositer}}</span>
        </div>
        <div class="information_props_wrap" v-if="showProposalId">
          <span class="information_props">Proposal ID:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/ProposalsDetail/${proposalId}`)">{{proposalId}}</span>
        </div>
        <div class="information_props_wrap" v-if="showVoter">
          <span class="information_props">Voter:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/address/1/${voter}`)">{{voter}}</span>
        </div>
        <div class="information_props_wrap" v-if="showTypeTransfer">
          <span class="information_props">From:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/address/1/${fromValue}`)">{{fromValue}}</span>
        </div>
        <div class="information_props_wrap" v-if="showSource">
          <span class="information_props">Source:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/address/1/${source}`)">{{source}}</span>
        </div>
        <div class="information_props_wrap" v-if="showTypeTransfer">
          <span class="information_props">To:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/address/1/${toValue}`)">{{toValue}}</span>
        </div>
        <div class="information_props_wrap" v-if="moniker">
          <span class="information_props">Moniker:</span>
          <span class="information_value"><pre class="information_pre">{{moniker}}</pre></span>
        </div>
        <div class="information_props_wrap" v-if="identity">
          <span class="information_props">Identity:</span>
          <span class="information_value">{{identity}}</span>
        </div>
        <div class="information_props_wrap" v-if="owner">
          <span class="information_props">Owner:</span>
          <span class="information_value link_active_style" @click="skipRoute(`/address/1/${owner}`)">{{owner}}</span>
        </div>
        <div class="information_props_wrap" v-if="pubkey">
          <span class="information_props">Pub key:</span>
          <span class="information_value">{{pubkey}}</span>
        </div>
        <div class="information_props_wrap" v-if="website">
          <span class="information_props">Website:</span>
          <span class="information_value"><pre class="information_pre">{{website}}</pre></span>
        </div>
        <div class="information_props_wrap" v-if="selfBond">
          <span class="information_props">Self-Bond:</span>
          <span class="information_value">{{selfBond}}</span>
        </div>
        <div class="information_props_wrap" v-if="details">
          <span class="information_props">Details:</span>
          <span class="information_value">{{details}}</span>
        </div>
        <div class="information_props_wrap" v-if="showVoter">
          <span class="information_props">Option:</span>
          <span class="information_value">{{option}}</span>
        </div>
        <div class="information_props_wrap" v-if="showTypeTransfer || showTypeDeposit">
          <span class="information_props">Amount:</span>
          <span class="information_value">{{amountValue}}</span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Timestamp:</span>
          <span class="information_value">{{timestampValue}}</span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Actual Tx Fee:</span>
          <span class="information_value">{{actualTxFee}}</span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Gas Limit:</span>
          <span class="information_value">{{gasLimit}}</span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Gas Used by Tx:</span>
          <span class="information_value">{{gasUsedByTxn}}</span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Gas Price:</span>
          <span class="information_value">{{gasPrice}} <span v-if="gasPrice">{{gasPriceUnit}}</span></span>
        </div>
        <div class="information_props_wrap">
          <span class="information_props">Memo:</span>
          <span class="information_value">{{memo}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Tools from '../common/Tools';
  import axios from 'axios';
  export default {

    data() {
      return {
        devicesWidth: window.innerWidth,
        transactionsDetailWrap: 'personal_computer_transactions_detail',//1是显示pc端，0是移动端
        hashValue: '',
        blockValue: '',
        typeValue: '',
        fromValue: '',
        toValue: '',
        timestampValue: '',
        amountValue: '',
        actualTxFee: '',
        gasLimit:'',
        gasUsedByTxn:'',
        gasPrice:'',
        // EDIT ===>>> 20181106
        gasPriceUnit:'',
        // END
        memo: "",
        owner: "",
        moniker: "",
        selfBond: "",
        pubkey: "",
        identity: "",
        website: "",
        details: "",
        source: "",
        showSource: "",
        proposer: "",
        initialDeposit: "",
        title: "",
        description: "",
        proposalId: "",
        proposalType:"",
        depositer: "",
        voter: "",
        option: "",
        showProposalId: false,
        showProposer: false,
        showInitialDeposit: false,
        showTypeTransfer:false,
        showVoter: false,
        showTypeDeposit: false,
      }
    },
    beforeMount() {
      if (Tools.currentDeviceIsPersonComputer()) {
        this.transactionsDetailWrap = 'personal_computer_transactions_detail_wrap';
      } else {
        this.transactionsDetailWrap = 'mobile_transactions_detail_wrap';
      }
    },

    mounted() {
      let url = `${this.$http_u}/api/tx/${this.$route.query.txHash}`;
      if(!this.$route.query.txHash){
        return;
      }
      axios.get(url).then((data)=>{
        if(data.status === 200){
          return data.data;
        }
      }).then((data)=>{
        if(data && typeof data === "object"){
          this.hashValue = data.Hash;
          this.blockValue = data.BlockHeight;
          this.typeValue = data.Type === 'coin'?'transfer':data.Type;
          this.timestampValue = Tools.conversionTimeToUTC(data.Timestamp);
          // EDIT ===>>> 20181208
          // this.gasPrice = Tools.scientificToNumber(Tools.formatNumber(data.GasPrice));
          this.gasPrice = Tools.scientificToNumber(data.GasPrice);
          // END
          // EDIT ===>>> 20181116
          this.gasPriceUnit = data.Fee.denom.toUpperCase();
          // END
          this.gasLimit = data.GasLimit;
          this.gasUsedByTxn = data.GasUsed;
          this.memo = data.Memo ? data.Memo : '--';

          if(data.Amount && data.Amount.length !==0){
            this.amountValue = data.Amount.map(item=>{
              // EDIT ===>>> 20181208
              item.amount = Tools.scientificToNumber(item.amount);
              // item.amount = Tools.scientificToNumber(Tools.formatNumber(item.amount));
              // item.amount = item.amount
              // END
              if(data.Type === 'CompleteUnbonding' || data.Type === 'BeginUnbonding' || data.Type === "BeginRedelegate"){
                return `${item.amount}shares`;
              }else{
                return `${item.amount} ${item.denom.toUpperCase()}`;
              }
            }).join(',') ;
          }else {
            this.amountValue = "--"
          }
          // EDIT ===>>> 20181208
          // this.actualTxFee = `${Tools.scientificToNumber(Tools.formatNumber(data.Fee.amount))} ${data.Fee.denom.toUpperCase()}`;
          this.actualTxFee = `${Tools.scientificToNumber(data.Fee.amount)} ${data.Fee.denom.toUpperCase()}`;
          // END


          if(data.Type === "Transfer" || data.Type === "Delegate" || data.Type === "BeginUnbonding" || data.Type === "CompleteUnbonding"){
            this.showTypeTransfer = true;
            this.fromValue = data.From;
            this.toValue = data.To;
          }else if(data.Type === "CreateValidator" || data.Type === "EditValidator"){
            this.owner = data.Owner ? data.Owner : '--';
            this.moniker = data.Moniker ? data.Moniker : '--';
            this.pubkey = data.Pubkey ? data.Pubkey : "--";
            this.identity = data.Identity ? data.Identity : '--';
            this.website = data.Website ? data.Website : '--';
            this.details = data.Details ? data.Details : '--';
            if(data.SelfBond && data.SelfBond.length !== 0){
              this.selfBond = `${Tools.scientificToNumber(Tools.formatNumber(data.SelfBond[0].amount))} ${data.SelfBond[0].denom.toUpperCase()}`;
            }else {
              this.selfBond = "--"
            }
          }else if(data.Type === "BeginRedelegate" || data.Type === "CompleteRedelegate" ){
            this.showTypeTransfer = true;
            this.showSource = true;
            this.fromValue = data.From ? data.From : '';
            this.toValue = data.To ? data.To : "";
            this.source = data.Source ? data.Source : "";
          }else if(data.Type === "SubmitProposal"){
            this.showProposer = true;
            this.showInitialDeposit = true;
            this.title = data.Title ? data.Title : '--';
            this.proposer = data.From;
            this.proposalType = data.ProposalType;
            if(data.Amount && data.Amount.length !==0){
              this.initialDeposit = data.Amount.map(item=>{
                item.amount = Tools.scientificToNumber(Tools.formatNumber(item.amount));
                return `${item.amount} ${item.denom.toUpperCase()}`;
              }).join(',') ;
            }else {
              this.initialDeposit = "--"
            }
            this.description = data.Description ? data.Description : '--';
          }else if(data.Type === "Deposit"){
            this.showProposalId = true;
            this.showTypeDeposit = true;
            this.proposalId = data.ProposalId === 0 ? "--" : data.ProposalId;
            this.depositer = data.From ? data.From : "--";
          }else if(data.Type === "Vote"){
            this.showProposalId = true;
            this.showVoter = true;
            this.proposalId = data.ProposalId === 0 ? "--" : data.ProposalId;
            this.voter = data.From ? data.From : '--';
            this.option = data.Option ? data.Option : "--";
          }
        }

      }).catch(e => {
        console.log(e)
      })
    },
    methods: {
      skipRoute(path) {
        this.$router.push(path);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin.scss';
  .information_pre{
    color: #a2a2ae;
  }
  .transactions_detail_wrap {
    @include flex;
    @include pcContainer;
    font-size:0.14rem;
    position:relative;
    .transactions_title_wrap {
      width: 100%;
      // border-bottom: 1px solid #d6d9e0;
      // @include flex;
      // @include pcContainer;
      background:transparent;
      position:absolute;
      top:-0.87rem;
      height:0.62rem;
      .personal_computer_transactions_detail_wrap {
        @include flex;
        text-align:center;
        justify-content:center;
        align-items:center;
        // height:4.7rem;
        margin-left:auto;
        margin-right:auto;
        height:100%;
        span{
          line-height:0.62rem;
          height:0.62rem;
        }
      }
      .mobile_transactions_detail_wrap {
        @include flex;
        flex-direction: column;
      }

    }
    .personal_computer_transactions_detail_wrap {
      .transaction_information_content_title{
        height: 0.5rem !important;
        line-height: 0.5rem !important;
        font-size: 0.24rem !important;
        color: #000000;
        margin-bottom: 0;
        border-bottom:0px solid #d6d9e0 !important;
      }
      @include pcCenter;
      .transactions_detail_information_wrap{
        padding:0.16rem 0rem 1.16rem;
        background:#fff;
        text-indent:0.3rem;
        border-radius:0.1rem;
        position:relative;
        top:-0.25rem;
        .information_props_wrap{
          @include flex;
          margin-bottom:0.08rem;
          .information_props{
            width:2rem;
          }
        }
      }
      .transactions_detail_title {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.3rem!important;
        color: #fff!important;
        margin-right: 0.2rem;
        font-weight: 500;
      }
      .transactions_detail_wrap_hash_var {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.22rem;
        color: #a2a2ae;
      }
    }

    .mobile_transactions_detail_wrap {
      width: 100%;
      @include flex;
      flex-direction: column;
      padding: 0 0.1rem;
      .transaction_information_content_title{
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.18rem;
        color: #000000;
        margin-bottom:0;
      }
      .transactions_detail_information_wrap{
padding:0.16rem 0rem;
        .information_props_wrap{
          @include flex;
          flex-direction:column;
          border-bottom:0.01rem solid #eee;
          margin-bottom:0.05rem;
          .information_value{
            overflow-x:auto;
            -webkit-overflow-scrolling:touch;

          }

        }
      }
      .transactions_detail_title {
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.22rem;
        color: #000000;
        margin-right: 0.2rem;
        font-weight:500;
      }
      .transactions_detail_wrap_hash_var {
        overflow-x: auto;
        -webkit-overflow-scrolling:touch;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.22rem;
        color: #a2a2ae;
      }
    }
  }
  .link_active_style{
    color:#3598db !important;
    cursor:pointer;
  }
</style>
