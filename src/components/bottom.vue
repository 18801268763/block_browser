<template>
  <div class="footer">
    <div class="logo">
      <div class="bottom-icon">        
        
        <b-collapse id="collapse1">
          <div class="modal-body">
            <img src="../assets/weixin_code.png" alt="">
          </div>
        </b-collapse>
        <b-collapse id="collapse2">
          <div class="modal-body">
            <div class="popover-content">绿洲官方中文群：<a href='https://t.me/Oasischina' target='_blank'>https://t.me/Oasischina</a><br>绿洲官方英文群：<a href='https://t.me/Oasisnet' target='_blank'>https://t.me/Oasisnet</a></div>
          </div>   
        </b-collapse>     
        <a href="javascript:void(0)" class="icon-unit" v-b-toggle.collapse1>
          <v-icon name="brands/weixin" scale="1.6"/>
        </a>
        <!-- <Poptip title="Title" content="content" placement="left" trigger="click">
          <Button>Hover</Button>
        </Poptip> -->
        <a href="mailto:admin@oasis.top" target="_blank" class="icon-unit">
          <v-icon name="envelope" scale="1.6"/>
        </a>
        <a href="javascript:void(0)" slot="reference" class="icon-unit" v-b-toggle.collapse2>
          <v-icon name="brands/telegram" scale="1.6"/>
        </a>            
        <a href="https://twitter.com/OasisBlockchain" target="_blank" class="icon-unit">
          <v-icon name="brands/twitter" scale="1.6"/>
        </a>
        <a href="https://medium.com/@OasisBlockchain" target="_blank" class="icon-unit">
          <v-icon name="brands/medium" scale="1.6"/>
        </a>
        <a href="https://github.com/OasisSpace/" target="_blank" class="icon-unit">
          <v-icon name="brands/github" scale="1.6"/>
        </a>
        <a href="https://weibo.com/oasisblockchain/" target="_blank" class="icon-unit">
          <v-icon name="brands/weibo" scale="1.6"/>
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      Copyright © 2018 Oasis Foundation. All Rights Reserved
    </div>    
  </div>  
</template>

<script>
import Icon from './Icon/Icon'
import './Icon/icons/brands/weixin'
import './Icon/icons/brands/weibo'
import './Icon/icons/brands/telegram'
import './Icon/icons/brands/twitter'
import './Icon/icons/brands/medium'
import './Icon/icons/brands/github'
import './Icon/icons/envelope'
 
export default {
  name: 'bottom',  
  components: {    
    'v-icon':Icon
  },  
  data () {
    return {
      msg: 'bottom',      
    }
  },
  created () {
    
  },
  methods: {    
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>  

  
  .modal-body{
    padding:0.1rem;
    color:#676d7b!important;
    font-size:14px;
    a{
      color:#2d8cf0!important;
    }
    img{
      width: 200px;
      height: 200px;
    }
  }
  
  .footer{
    background: #242937;
    position:relative;

    .logo{
      border-bottom: 1px solid #3a3f4b;
      padding: 30px 0;
      margin: 0 auto;
      max-width: 1200px;

      .bottom-icon{
        text-align: center;
        
        .icon-unit{
          display: inline-block;
          height: 48px;
          width: 48px;
          border: 2px solid #ebebeb;
          border-radius: 50%;
          font-size: 24px;
          color: #fff!important;
          line-height: 40px;
          text-align: center;
          transition: 0.3s;
          margin: 0 20px;
          box-sizing: border-box;
          
          &:hover{
            color:#00c7df!important;
            border:2px solid #00c7df;
          }
          &.weixin:hover{
            color:#00cb0d!important;
            border:2px solid #00cb0d;
          }          
        }
      }
    }
    .footer-bottom{
      color: #676d7b;
      height: 75px;
      line-height: 75px;
      font-size: 12px;
      text-align: center;
    }
  }
  
  

</style>