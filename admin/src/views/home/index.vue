<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <!-- <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item> -->
          <el-form-item label="开始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.sdate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.edate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>



      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <!-- <el-button size="mini" class="btn-add"  style="margin-left: 20px" @click="xlsxDisc">导出</el-button>
      <el-form class="exclxWarp" :inline="true" :model="listQuery" size="small" label-width="80px">
        <el-form-item >
          <el-select v-model="TypeOptions" class="input-width" placeholder="全部" clearable>
            <el-option v-for="item in sourceTypeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="60" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="性别" width="80" align="center">
          <template slot-scope="scope">{{scope.row.gender | gender}}</template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">{{scope.row.tel}}</template>
        </el-table-column>
        <el-table-column label="生日" align="center">
          <template slot-scope="scope">{{scope.row.birthday | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.creatTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email || '-'}}</template>
        </el-table-column>
        <el-table-column label="国籍" align="center">
          <template slot-scope="scope">{{scope.row.nationality || '-'}}</template>
        </el-table-column>
        <el-table-column label="学历" align="center">
          <template slot-scope="scope">{{scope.row.education || '-'}}</template>
        </el-table-column>
        <!-- <el-table-column label="paypal账号" align="center">
          <template slot-scope="scope">{{scope.row.paypalAccount || '-'}}</template>
        </el-table-column> -->
        <el-table-column label="DISC" align="center">
          <template slot-scope="scope">{{scope.row.disc_d}} | {{scope.row.disc_i}} | {{scope.row.disc_s}} | {{scope.row.disc_c}} </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="xlsxDisc(scope.row)">导出word</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.size"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {getList, getXlsx} from '@/api/login';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    page: 1,
    size: 10,
    sdate: null,
    edate: null,
  };
  let isonlys = true;
  export default {
    name: 'adminList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        TypeOptions: '0',
        sourceTypeOptions:[
          {value: '0', label:'今天'},
          {value: '1', label:'昨天'},
          {value: '2', label:'近七天'},
          {value: '3', label:'近一月'},
          {value: '4', label:'全部'}
        ],
        listLoading: false
      }
    },
    created() {
      this.getList();
      // this.getAllRoleList();
    },
    filters: {
      gender(val){
        if(val == '1')return '男';
        return '女';
      },
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      openDownloadDialog(url, saveName){
        isonlys = true;
        if(typeof url == 'object' && url instanceof Blob){
      		url = URL.createObjectURL(url); // 创建blob地址
      	}
      	var aLink = document.createElement('a');
      	aLink.href = url;
      	aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        console.log(aLink)
        var event;
      	if(window.MouseEvent) event = new MouseEvent('click');
      	else
      	{
      		event = document.createEvent('MouseEvents');
      		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      	}
      	aLink.dispatchEvent(event);
      },
      xlsxDisc(data){
        console.log(data)
        if(!isonlys)return this.$message({
          message: '请勿重复提交',
          type: 'error'
        });
        isonlys = false;
        var data_list = [
          {name: 'd',val:data.disc_d - 0},
          {name: 'i',val:data.disc_i - 0},
          {name: 's',val:data.disc_s - 0},
          {name: 'c',val:data.disc_c - 0},
        ];
        initEcharts({
          data:[data.disc_d - 0, data.disc_i - 0, data.disc_s - 0, data.disc_c - 0],
          maxNum: getMaxNum(data_list, 'val'),
          indicator: ['Dominance -- 支配型/控制者','Influence -- 互动型/社交者', 'Steadiness -- 稳定型/支持者','Compliance -- 完美型/思考者']
        });
        setTimeout(() => {
          // console.log(this.TypeOptions)
          let datas = {
            name: data.name,
            id: data.id,
            lang: 'zh',
            img: convertCanvasToImage()
          }
          this.$confirm('是否导出英文?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            datas['lang'] = 'en';
            getXlsx(datas).then(res => {
              this.openDownloadDialog(res.data.url, res.data.name);
            });
          }, ()=>{
            getXlsx(datas).then(res => {
              this.openDownloadDialog(res.data.url, res.data.name);
            });
          })
        },100)
        // return false;
        // return false;
        // getXlsx({time:this.TypeOptions}).then(res => {
        //   console.log(res)
        //   this.openDownloadDialog(res.data, 'disc.xlsx');
        //   // this.openDownloadDialog('/static/down/disc.xlsx', 'disc.xlsx');
        // });

        //this.openDownloadDialog('/static/down/disc.xlsx', 'disc.xlsx');
      },
      getList() {
        // this.listLoading = true;
        if(!this.listQuery.sdate || !this.listQuery.edate){
          let today = formatDate(new Date(), 'yyyy-MM-dd');
          this.listQuery.sdate = today;
          this.listQuery.edate = today;
        }
        // this.listQuery['']
        // console.log(this.listQuery)
        // return false;
        getList(this.listQuery).then(res => {
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.count;
        });
      },
      handleSearchList() {
        this.listQuery.page = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.page = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      }

    }
  }
</script>
<style></style>
