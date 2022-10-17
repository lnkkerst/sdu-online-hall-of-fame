const data = {
  swipeImages: [
    {
      title: 'test',
      url: 'https://img0.baidu.com/it/u=2950004902,2334058314&fm=253&fmt=auto&app=138&f=JPEG?w=735&h=489'
    },
    {
      title: 'test1',
      url: 'https://varlet.gitee.io/varlet-ui/cat.jpg'
    },
    {
      title: 'test2',
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbc75b750a725057587ced41a49882780277ead04501bf-uHetzD_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668605630&t=76acf73adbd0ec6043a538f0d30a6ad3'
    },
    {
      title: 'test3',
      url: 'https://varlet.gitee.io/varlet-ui/cat3.jpg'
    }
  ]
};

export async function useData() {
  return data;
}
