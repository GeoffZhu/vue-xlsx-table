<template>
  <div class="vue-xlsx-container">
    <div class="xlsx-upload-wrapper">
      <button type="button" class="xlsx-button" @click="handleUploadBtnClick">
        <slot></slot>
      </button>
      <input id="upload-input" type="file" :accept="accept" class="c-hide" @change="handkeFileChange">
    </div>
    <div v-show="showDialog" class="xlsx-dialog-wrapper">
      <div class="xlsx-dialog-content">
        <div class="xlsx-dialog__header">
          <span class="el-dialog__title">
            <slot name="dialog-title">请确认 Excel 中的数据是否正确</slot>
          </span>
        </div>
        <div class="xlsx-dialog__body">
          <xlsx-table :header="tableData.header" :body="tableData.body"></xlsx-table>
        </div>
        <div class="xlsx-dialog__footer">
          <span class="dialog-footer">
            <button type="button" class="xlsx-button button-large button-primary mr20" @click="hadnleCancel"><slot name="dialog-cancel">取消</slot></button>
            <button type="button" class="xlsx-button button-large" @click="handleOk"><slot name="dialog-ok">正确</slot></button>
          </span>
        </div>
      </div>
    </div>
    <div v-show="showDialog" class="xlsx-dialog-modal"></div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import XlsxTable from './components/xlsx-table.vue'

export default {
  name: 'vue-xlsx-table',
  components: {
    XlsxTable
  },
  data () {
    return {
      showDialog: false,
      rawFile: null,
      workbook: null,
      tableData: {
        header: [],
        body: []
      }
    }
  },
  props: {
    accept: {
      type: String,
      default: '.xlsx, .xls'
    }
  },
  computed: {
    rABS () {
      return window.xlsxEventBus.XLSX_EVENTS_DATA.options.rABS
    }
  },
  methods: {
    handkeFileChange (e) {
      if (this.rawFile !== null) {
        return
      }
      this.rawFile = e.target.files[0]
      this.fileConvertToWorkbook(this.rawFile)
        .then((workbook) => {
          let xlsxArr = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
          this.workbook = workbook
          this.showDialog = true
          this.initTable(
            this.xlsxArrToTableArr(xlsxArr)
          )
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fileConvertToWorkbook (file) {
      let reader = new FileReader()
      let fixdata = (data) => {
        let o = "", l = 0, w = 10240
        for( ; l<data.byteLength/w ; ++l) {
          o += String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)))
        return o
      }
      return new Promise((resolve, reject) => {
        try {
          reader.onload = (renderEvent) => {
            let data = renderEvent.target.result
            if(this.rABS) {
              /* if binary string, read with type 'binary' */
              resolve(XLSX.read(data, {type: 'binary'}))
            } else {
              /* if array buffer, convert to base64 */
              let arr = this.fixdata(data)
              resolve(XLSX.read(btoa(arr), {type: 'base64'}))
            }
          }
          reader.onerror = (error) => {
            reject(error)
          }
          if (this.rABS) {
            reader.readAsBinaryString(file)
          } else {
            reader.readAsArrayBuffer(file)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    xlsxArrToTableArr (xlsxArr) {
      let tableArr = []
      let length = 0
      let maxLength = 0
      let maxLengthIndex = 0
      xlsxArr.forEach((item, index) => {
        length = Object.keys(item).length
        if (maxLength < length) {
          maxLength = length
          maxLengthIndex = index
        }
      })
      let tableHeader = Object.keys(xlsxArr[maxLengthIndex])
      let rowItem = {}
      xlsxArr.forEach((item) => {
        rowItem = {}
        for (let i = 0; i < maxLength; i++) {
          rowItem[tableHeader[i]] = item[tableHeader[i]] || ''
        }
        tableArr.push(rowItem)
      })
      return {
        header: tableHeader,
        data: tableArr
      }
    },
    tableArrToXlsxArr ({data, header}) {
      let xlsxArr = []
      let tempObj = {}
      data.forEach((rowItem) => {
        tempObj = {}
        rowItem.forEach((item, index) => {
          tempObj[header[index]] = item
        })
        xlsxArr.push(tempObj)
      })
      return xlsxArr
    },
    initTable ( {data, header} ) {
      this.tableData.header = header
      this.tableData.body = data
    },
    handleUploadBtnClick () {
      document.getElementById('upload-input').click()
    },
    clearAllData () {
      document.getElementById('upload-input').value = null
      this.tableData = {
        header: [],
        body: []
      }
      this.rawFile = null
      this.workbook = null
      this.showDialog = false
    },
    hadnleCancel () {
      this.$emit('on-click-cancel', this.tableData)
      this.clearAllData()
    },
    handleOk () {
      this.$emit('on-click-ok', this.tableData)
      this.clearAllData()
    }
  }
}
</script>

<style lang="less">
.vue-xlsx-container{
  display: inline-block;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .c-hide{
    display: none;
  }
  .xlsx-upload-wrapper {

  }
  .xlsx-dialog-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    .xlsx-dialog-content {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-sizing: border-box;
      margin-bottom: 50px;
      top: 15%;
      .xlsx-dialog__header{
        padding: 20px 20px 0;
        font-weight: bold;
      }
      .xlsx-dialog__body{
        position: relative;
        overflow: hidden;
        padding: 30px 20px;
        color: #48576a;
      }
      .xlsx-dialog__footer{
        padding: 10px 20px 15px;
        text-align: right;
        box-sizing: border-box;
      }
    }
  }
  .xlsx-dialog-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 2000;
  }
  .xlsx-table-wrapper{
    font-size: 13px;
    width: 1000px;
    table {
      table-layout: fixed;
      width: 100%;
      text-align: center;
      border-collapse: collapse;
    }
    thead {
      font-weight: bold;
      background-color: #eff2f7;
    }
    td {
      border: 1px solid #8492a6;
      padding: 5px 0;
      word-wrap: break-word;
    }
  }
}
.xlsx-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #20a0ff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 7px 9px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #20a0ff;
  &.button-large{
    padding: 10px 15px;
    font-size: 14px;
  }
  &.button-primary{
    color: #1f2d3d;
    border: 1px solid #bfcbd9;
    background-color: #fff;
  }
}
.mr20{
  margin-right: 20px;
}
</style>
