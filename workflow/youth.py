#!/usr/bin/env python3
# _*_ coding:utf-8 _*_

# 此脚本参考 https://github.com/Sunert/Scripts/blob/master/Task/youth.js

import traceback
import time
import re
import json
import sys
import os
from util import send, requests_session
from datetime import datetime, timezone, timedelta

# YOUTH_HEADER 为对象, 其他参数为字符串，自动提现需要自己抓包
# 选择微信提现30元，立即兑换，在请求包中找到withdraw2的请求，拷贝请求body类型 p=****** 的字符串，放入下面对应参数即可
# 分享一篇文章，找到 put.json 的请求，拷贝请求体，放入对应参数
cookies1 = {
  'YOUTH_HEADER': {"Cookie":"sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2252339221%22%2C%22%24device_id%22%3A%2217685b0e4801de-01c24a24fa7b8f8-2c590766-250125-17685b0e481641%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2217685b0e4801de-01c24a24fa7b8f8-2c590766-250125-17685b0e481641%22%7D; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1608738666,1608739786,1608775838,1608776352; Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1608738517,1608738687,1608738729,1608775864","Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Connection":"keep-alive","Host":"kd.youth.cn","Accept-Language":"zh-cn","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","Referer":"https://kd.youth.cn/html/taskCenter/index.html?uuid=f079fa3931dce5c6b9a1040e998c5acc&sign=0c6731192f15e257c782bfe54cb39da1&channel_code=80000000&uid=52339221&channel=80000000&access=WIfI&app_version=1.8.2&device_platform=iphone&cookie_id=03f896e3f56a2cb5f5c8d8e71d78f802&openudid=f079fa3931dce5c6b9a1040e998c5acc&device_type=1&device_brand=iphone&sm_device_id=202012212223295906d6e80d0604adc80835caec324427017b2f49555b9825&device_id=49116602&version_code=182&os_version=14.3&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl66bsayyt32yhIyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLCnm2qFonaZrrnEapqGcXY&device_model=iPhone_6&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl66bsayyt32yhIyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLCnm2qFonaZrrnEapqGcXY&cookie_id=03f896e3f56a2cb5f5c8d8e71d78f802","X-Requested-With":"XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZFhlcDJAu18Jq4KFU41Ad4lgmyBQDr7V9vDrxN83BD69HJweauC6gnGn0W0sQcuBJYubHn9LY6_h2nxeJyb-NLY2bNmKunBh8zhC2XskojadnybAW5yx_XfR1o250bufS8Kk4354H9kUpMOl2IimSUOYJuC6YbB4afFq3aSadrrWpqs8vj2qvW_xntCM1vC-2Umxqu0ey7KYdKqWtGtjYt09Mr1vzpuj5tkCkExTyWjaK6bpMe-l9hIu1V3U5FIOsUnRR3AWI_pUEB_wDXtPw-BK4G0lMNeJKrbE6-NBJBlmyjss_TDx-kMeLqKB4-aXv6OQAjZuZ1rs7vvNKppJ7MOMOhfqkx9727gj1ynM3ErPiTV5iBveN-Np6NovuLLDXkOEYAwL3G65FEos08-SkygH7FHE-3Djzavpq74f4yy1dP76mwwteq30rBQ50mkD-KbfjgeieHWI4b7yE-BJgLmNEXhUDQfs5eDU07Dkx87SDABUrAwkTePnj8FBNcQb6Zl5GM8xR73miW2ob2B0qpVuVa9EvlUy4n3VVFexhN1fqyQfO79o1m3o813-kZsb7DfNvFWyxFUkoeceySN4f0jgyeMHJ_OJ24B0XPXKK4chYVm2bQ-eu0obElUbDeaWP_H1RYfzqMBYDyu2Y51VX0oWJuOsdzihPFryLroncGDNXuP_bSWSlyuq9XsoDbcwdHnjATAZDnO4AdRXbbKy3vVlEJlv-_jjCfurBa8J695G7nYlinnyotlc6Ii121GGkKYhyWSTpBOpdx5c4I6FBcXXBXdewTZKqhJFbSrRsuy2yH59jKS5Z4OgKLS9byGcvDwhM_RtVarB',
  'YOUTH_REDBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjazbBlBp4-3VBqIE6FTR2KhfyLVi7Pl1_m0wwPJgXu-Fmh7S-5HqV6o2kNNfxbTBdHNeGGUACeILyWR3zMN6Iw3IXfZs4Lu-yb9ynQmQje6lCx_IwxRVvI2SNym5MJ3oH5lFqmbtpdkJfwhB1sUJEdEgJ5iEwGnEtnWJDQPgSUh_43T95feCdA6znUBf7UdpUNuu05JsguiVleK5plWi4a67GWlGbd_paCLiNUixge_ny3dPVIKbc5uwnnVRy45cg7B6H7oDtqM3G9bau0oebqslgEUMGGlsFQu89yH-gQijcNIitfhYDmgLWinvKSbV5_CUbkI6SHb0jml6C62g-RVxVd8xdC3AJgMFkc1-UO--wX7VPNaZgTN8HeZNwLoIxiQ9cieQU9hLujnE7OJ55V9NQZ_2P6biipJ1JepkcUqA1zv1hsROR5hnwcce_HRxb50X3nql_AZj1WUFf1tUZIXEr0V7KxjIz9pfrpP6fRWbebomyxgk3BNJuIapcI6P82jp1hsVOZtmrPChWx2wDU9sUXQRUGfQDiMHcuHBqRRXviq7nWIG5xXl_t7QkmQpUsepj76ZV0syUfpvT-D6IpPb8n88g6T-1phGj11d1kkTEPQBIR00MrPif-k36Yfgu0RJN1pS8xDXV0JgHV5WqVabSpJ0I8Mn881JiDeAm7DwKL7VseFRM3wFXyNCIMEUYBQ5ZEGnBWgwW6doT4v-JQYsY8exuI-rXjy4jjhpIKbPMjtZLn_0YfXu6KL4guNdE5mn9qLDRiZXA4wK3rvppndtpNvOh3Z8R0KBnwJHwSDzc4DNz-sT30e-4Jans_qB8HL0TycDuJrdg%3D%3D',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBCcm2GMY5HbKZykUaV1Q2SK255C12Bl5n8FPQ-mqYRTvawQ6Q86pR8lE2LjIg_dy_RLm-gQIamm6nZp85QhJW6ZU6olQGjnVnb8QelpevBYMU3V7HYE55EPFA3fA-jy9kRhk6eCH_9D_vwt3qei9B_nb7Vl6KsaSU2gRWYJBbtzO4LAK-BUiWBVk30JWg0i0WnsTlQk9YZN9Xh6EX7neCHp-6zDbRyXn5_CanC5dHlfdWPNadUGrlV522Tsl_B6_TSOruodJQ3nhVLKuLw_i1glnzYDwOlVMacKfwLkFlMQa5U_34tcnBXHvB1BDNHzY9z7QKuIven7fRRcp8ibBQNfLTDbVvApEAkm5c1p0D1SnF_23wmWQmEdE1PIJ7wZ0h4R1uGU2O4Qi8b191L_2uRkYKuCd1-yb-xW9UShQL4hmB2o_T6n3YzbXs1ws_Zt-Do39lDE9stIqzy_xy98a2SGGpKj1ciR5QhNdFXXz9QxSZZ0DdycPniInXzcZA57gX1DhXhLOg5kK35E--aZB3HxyJJjBMBCemxAGGPFlcEIh7w3TRbJVBh28xNzlYcxlGbmkzWM7tLjIWjr5ACJvcqVoF0InyjU-RRqBIRHG0ZTs7OwiBl5Rf_S3HwVZP0kB0_0MYutQHuLjci31ZKOwGYcX2TtPg-saII%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT03IBrau4uR3exdQO9GoMXHgHZ5sS0vNMck9mFTHho5A9lB2ZsJSqWtblHzTYoRHV0Hj8iP1lgOyowAYFQPulF_cOMJDT-2BceNZuBGYa4qGk0LUaqVKyggnPIsTJecJ-Cd9vFk5p_1DOKJ3kNbH2KvJFZFh1o8S2nwkU4TOfwV1kOYcgHU9UGXIxx4kjImBExIzdpQRhmWId2UCE2kHUJKASpFcemzrotD3rVTSL3c6F_JBbph6ROD6LVcN7BoeTvyLxWUmlDTbDO6_ARymfBWiJHFSS9kJf8iBBDbQzvgxqxvmnWGhW_w4QXwzpJgYdTNPkg-T13Nbwm9h0ME9uhdxRlnY2D-KLVpHe6xP582J669w5lOIvjuZ3AeQtTvuA1s8O9ICNs5Z-Jnp8QS6oLJ2LxUWSNgx9yF8Ocs0UokmkvbIexdg1WXg%3D%3D',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.0&article_id=36228401&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.0&device_brand=iphone&device_id=48555420&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=d7c11d0afc94bf0193702a2d2d37e455&os_version=14.4&phone_code=d7c11d0afc94bf0193702a2d2d37e455&phone_network=WIFI&platform=3&request_time=1613207449&resolution=828x1792&sign=e694d3dd492d9049888134eb89f8b1c2&sm_device_id=202011191042385c2a0dc85220a736e6501f9d2baf385901e71d1d26c0b271&stype=WEIXIN&szlm_ddid=D2qeYlHbw8gsQ0wdf3jMSEhmak4qTkFhm5t6UZzFTN47wX41&time=1613207449&uid=51588723&uuid=d7c11d0afc94bf0193702a2d2d37e455'
}
cookies2 = {
  'YOUTH_HEADER': {"Cookie":"sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2252339221%22%2C%22%24device_id%22%3A%2217685b0e4801de-01c24a24fa7b8f8-2c590766-250125-17685b0e481641%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2217685b0e4801de-01c24a24fa7b8f8-2c590766-250125-17685b0e481641%22%7D; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1608738666,1608739786,1608775838,1608776352; Hm_lvt_6c30047a5b80400b0fd3f410638b8f0c=1608738517,1608738687,1608738729,1608775864","Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Connection":"keep-alive","Host":"kd.youth.cn","Accept-Language":"zh-cn","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148","Referer":"https://kd.youth.cn/html/taskCenter/index.html?uuid=f079fa3931dce5c6b9a1040e998c5acc&sign=0c6731192f15e257c782bfe54cb39da1&channel_code=80000000&uid=52339221&channel=80000000&access=WIfI&app_version=1.8.2&device_platform=iphone&cookie_id=03f896e3f56a2cb5f5c8d8e71d78f802&openudid=f079fa3931dce5c6b9a1040e998c5acc&device_type=1&device_brand=iphone&sm_device_id=202012212223295906d6e80d0604adc80835caec324427017b2f49555b9825&device_id=49116602&version_code=182&os_version=14.3&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl66bsayyt32yhIyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLCnm2qFonaZrrnEapqGcXY&device_model=iPhone_6&subv=1.5.1&&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl66bsayyt32yhIyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLCnm2qFonaZrrnEapqGcXY&cookie_id=03f896e3f56a2cb5f5c8d8e71d78f802","X-Requested-With":"XMLHttpRequest"},
  'YOUTH_READBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjab0hHSxXenkWHSkCwB26b0x_gtnWSAWxe4W5DsfKJWZFhlcDJAu18Jq4KFU41Ad4lgmyBQDr7V9vDrxN83BD69HJweauC6gnGn0W0sQcuBJYubHn9LY6_h2nxeJyb-NLY2bNmKunBh8zhC2XskojadnybAW5yx_XfR1o250bufS8Kk4354H9kUpMOl2IimSUOYJuC6YbB4afFq3aSadrrWpqs8vj2qvW_xntCM1vC-2Umxqu0ey7KYdKqWtGtjYt09Mr1vzpuj5tkCkExTyWjaK6bpMe-l9hIu1V3U5FIOsUnRR3AWI_pUEB_wDXtPw-BK4G0lMNeJKrbE6-NBJBlmyjss_TDx-kMeLqKB4-aXv6OQAjZuZ1rs7vvNKppJ7MOMOhfqkx9727gj1ynM3ErPiTV5iBveN-Np6NovuLLDXkOEYAwL3G65FEos08-SkygH7FHE-3Djzavpq74f4yy1dP76mwwteq30rBQ50mkD-KbfjgeieHWI4b7yE-BJgLmNEXhUDQfs5eDU07Dkx87SDABUrAwkTePnj8FBNcQb6Zl5GM8xR73miW2ob2B0qpVuVa9EvlUy4n3VVFexhN1fqyQfO79o1m3o813-kZsb7DfNvFWyxFUkoeceySN4f0jgyeMHJ_OJ24B0XPXKK4chYVm2bQ-eu0obElUbDeaWP_H1RYfzqMBYDyu2Y51VX0oWJuOsdzihPFryLroncGDNXuP_bSWSlyuq9XsoDbcwdHnjATAZDnO4AdRXbbKy3vVlEJlv-_jjCfurBa8J695G7nYlinnyotlc6Ii121GGkKYhyWSTpBOpdx5c4I6FBcXXBXdewTZKqhJFbSrRsuy2yH59jKS5Z4OgKLS9byGcvDwhM_RtVarB',
  'YOUTH_REDBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjazbBlBp4-3VBqIE6FTR2KhfyLVi7Pl1_m0wwPJgXu-Fmh7S-5HqV6o2kNNfxbTBdHNeGGUACeILyWR3zMN6Iw3IXfZs4Lu-yb9ynQmQje6lCx_IwxRVvI2SNym5MJ3oH5lFqmbtpdkJfwhB1sUJEdEgJ5iEwGnEtnWJDQPgSUh_43T95feCdA6znUBf7UdpUNuu05JsguiVleK5plWi4a67GWlGbd_paCLiNUixge_ny3dPVIKbc5uwnnVRy45cg7B6H7oDtqM3G9bau0oebqslgEUMGGlsFQu89yH-gQijcNIitfhYDmgLWinvKSbV5_CUbkI6SHb0jml6C62g-RVxVd8xdC3AJgMFkc1-UO--wX7VPNaZgTN8HeZNwLoIxiQ9cieQU9hLujnE7OJ55V9NQZ_2P6biipJ1JepkcUqA1zv1hsROR5hnwcce_HRxb50X3nql_AZj1WUFf1tUZIXEr0V7KxjIz9pfrpP6fRWbebomyxgk3BNJuIapcI6P82jp1hsVOZtmrPChWx2wDU9sUXQRUGfQDiMHcuHBqRRXviq7nWIG5xXl_t7QkmQpUsepj76ZV0syUfpvT-D6IpPb8n88g6T-1phGj11d1kkTEPQBIR00MrPif-k36Yfgu0RJN1pS8xDXV0JgHV5WqVabSpJ0I8Mn881JiDeAm7DwKL7VseFRM3wFXyNCIMEUYBQ5ZEGnBWgwW6doT4v-JQYsY8exuI-rXjy4jjhpIKbPMjtZLn_0YfXu6KL4guNdE5mn9qLDRiZXA4wK3rvppndtpNvOh3Z8R0KBnwJHwSDzc4DNz-sT30e-4Jans_qB8HL0TycDuJrdg%3D%3D',
  'YOUTH_READTIMEBODY': 'p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBCcm2GMY5HbKZykUaV1Q2SK255C12Bl5n8FPQ-mqYRTvawQ6Q86pR8lE2LjIg_dy_RLm-gQIamm6nZp85QhJW6ZU6olQGjnVnb8QelpevBYMU3V7HYE55EPFA3fA-jy9kRhk6eCH_9D_vwt3qei9B_nb7Vl6KsaSU2gRWYJBbtzO4LAK-BUiWBVk30JWg0i0WnsTlQk9YZN9Xh6EX7neCHp-6zDbRyXn5_CanC5dHlfdWPNadUGrlV522Tsl_B6_TSOruodJQ3nhVLKuLw_i1glnzYDwOlVMacKfwLkFlMQa5U_34tcnBXHvB1BDNHzY9z7QKuIven7fRRcp8ibBQNfLTDbVvApEAkm5c1p0D1SnF_23wmWQmEdE1PIJ7wZ0h4R1uGU2O4Qi8b191L_2uRkYKuCd1-yb-xW9UShQL4hmB2o_T6n3YzbXs1ws_Zt-Do39lDE9stIqzy_xy98a2SGGpKj1ciR5QhNdFXXz9QxSZZ0DdycPniInXzcZA57gX1DhXhLOg5kK35E--aZB3HxyJJjBMBCemxAGGPFlcEIh7w3TRbJVBh28xNzlYcxlGbmkzWM7tLjIWjr5ACJvcqVoF0InyjU-RRqBIRHG0ZTs7OwiBl5Rf_S3HwVZP0kB0_0MYutQHuLjci31ZKOwGYcX2TtPg-saII%3D',
  'YOUTH_WITHDRAWBODY': 'p=9NwGV8Ov71o%3DC5Jtxwc6iVuTcJotRQ4YI8A3NCwuYXT03IBrau4uR3exdQO9GoMXHgHZ5sS0vNMck9mFTHho5A9lB2ZsJSqWtblHzTYoRHV0Hj8iP1lgOyowAYFQPulF_cOMJDT-2BceNZuBGYa4qGk0LUaqVKyggnPIsTJecJ-Cd9vFk5p_1DOKJ3kNbH2KvJFZFh1o8S2nwkU4TOfwV1kOYcgHU9UGXIxx4kjImBExIzdpQRhmWId2UCE2kHUJKASpFcemzrotD3rVTSL3c6F_JBbph6ROD6LVcN7BoeTvyLxWUmlDTbDO6_ARymfBWiJHFSS9kJf8iBBDbQzvgxqxvmnWGhW_w4QXwzpJgYdTNPkg-T13Nbwm9h0ME9uhdxRlnY2D-KLVpHe6xP582J669w5lOIvjuZ3AeQtTvuA1s8O9ICNs5Z-Jnp8QS6oLJ2LxUWSNgx9yF8Ocs0UokmkvbIexdg1WXg%3D%3D',
  'YOUTH_SHAREBODY': 'access=WIFI&app_version=2.0.0&article_id=36228401&channel=80000000&channel_code=80000000&cid=80000000&client_version=2.0.0&device_brand=iphone&device_id=48555420&device_model=iPhone&device_platform=iphone&device_type=iphone&from=0&is_hot=0&isnew=1&mobile_type=2&net_type=1&openudid=d7c11d0afc94bf0193702a2d2d37e455&os_version=14.4&phone_code=d7c11d0afc94bf0193702a2d2d37e455&phone_network=WIFI&platform=3&request_time=1613207449&resolution=828x1792&sign=e694d3dd492d9049888134eb89f8b1c2&sm_device_id=202011191042385c2a0dc85220a736e6501f9d2baf385901e71d1d26c0b271&stype=WEIXIN&szlm_ddid=D2qeYlHbw8gsQ0wdf3jMSEhmak4qTkFhm5t6UZzFTN47wX41&time=1613207449&uid=51588723&uuid=d7c11d0afc94bf0193702a2d2d37e455'
}


COOKIELIST = [cookies1,cookies2]  # 多账号准备

# ac读取环境变量
if "YOUTH_HEADER1" in os.environ:
  COOKIELIST = []
  for i in range(5):
    headerVar = f'YOUTH_HEADER{str(i+1)}'
    readBodyVar = f'YOUTH_READBODY{str(i+1)}'
    redBodyVar = f'YOUTH_REDBODY{str(i+1)}'
    readTimeBodyVar = f'YOUTH_READTIMEBODY{str(i+1)}'
    withdrawBodyVar = f'YOUTH_WITHDRAWBODY{str(i+1)}'
    shareBodyVar = f'YOUTH_SHAREBODY{str(i+1)}'
    if headerVar in os.environ and os.environ[headerVar] and readBodyVar in os.environ and os.environ[readBodyVar] and redBodyVar in os.environ and os.environ[redBodyVar] and readTimeBodyVar in os.environ and os.environ[readTimeBodyVar]:
      globals()['cookies'+str(i + 1)]["YOUTH_HEADER"] = json.loads(os.environ[headerVar])
      globals()['cookies'+str(i + 1)]["YOUTH_READBODY"] = os.environ[readBodyVar]
      globals()['cookies'+str(i + 1)]["YOUTH_REDBODY"] = os.environ[redBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_READTIMEBODY"] = os.environ[readTimeBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_WITHDRAWBODY"] = os.environ[withdrawBodyVar]
      globals()['cookies' + str(i + 1)]["YOUTH_SHAREBODY"] = os.environ[shareBodyVar]
      COOKIELIST.append(globals()['cookies'+str(i + 1)])
  # print(COOKIELIST)

cur_path = os.path.abspath(os.path.dirname(__file__))
root_path = os.path.split(cur_path)[0]
sys.path.append(root_path)
YOUTH_HOST = "https://kd.youth.cn/WebApi/"

def get_standard_time():
  """
  获取utc时间和北京时间
  :return:
  """
  # <class 'datetime.datetime'>
  utc_datetime = datetime.utcnow().replace(tzinfo=timezone.utc)  # utc时间
  beijing_datetime = utc_datetime.astimezone(timezone(timedelta(hours=8)))  # 北京时间
  return beijing_datetime

def pretty_dict(dict):
    """
    格式化输出 json 或者 dict 格式的变量
    :param dict:
    :return:
    """
    return print(json.dumps(dict, indent=4, ensure_ascii=False))

def sign(headers):
  """
  签到
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/TaskCenter/sign'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('签到')
    # print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def signInfo(headers):
  """
  签到详情
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/TaskCenter/getSign'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('签到详情')
    # print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def punchCard(headers):
  """
  打卡报名
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/signUp'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('打卡报名')
    # print(response)
    if response['code'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def doCard(headers):
  """
  早起打卡
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/doCard'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('早起打卡')
    # print(response)
    if response['code'] == 1:
      shareCard(headers=headers)
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def shareCard(headers):
  """
  打卡分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  startUrl = f'{YOUTH_HOST}PunchCard/shareStart'
  endUrl = f'{YOUTH_HOST}PunchCard/shareEnd'
  try:
    response = requests_session().post(url=startUrl, headers=headers, timeout=30).json()
    print('打卡分享')
    # print(response)
    if response['code'] == 1:
      time.sleep(0.3)
      responseEnd = requests_session().post(url=endUrl, headers=headers, timeout=30).json()
      if responseEnd['code'] == 1:
        return responseEnd
    else:
      return
  except:
    print(traceback.format_exc())
    return

def luckDraw(headers):
  """
  打卡分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}PunchCard/luckdraw'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('七日签到')
    # print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def timePacket(headers):
  """
  计时红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}TimePacket/getReward'
  try:
    response = requests_session().post(url=url, data=f'{headers["Referer"].split("?")[1]}', headers=headers, timeout=30).json()
    print('计时红包')
    # print(response)
    return
  except:
    print(traceback.format_exc())
    return

def watchWelfareVideo(headers):
  """
  观看福利视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}NewTaskIos/recordNum?{headers["Referer"].split("?")[1]}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('观看福利视频')
    # print(response)
    return
  except:
    print(traceback.format_exc())
    return

def shareArticle(headers, body):
  """
  分享文章
  :param headers:
  :return:
  """
  url = 'https://ios.baertt.com/v2/article/share/put.json'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('分享文章')
    # print(response)
    return
  except:
    print(traceback.format_exc())
    return

def threeShare(headers, action):
  """
  三餐分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareNew/execExtractTask'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  body = f'{headers["Referer"].split("?")[1]}&action={action}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('三餐分享')
    # print(response)
    return
  except:
    print(traceback.format_exc())
    return

def openBox(headers):
  """
  开启宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}invite/openHourRed'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('开启宝箱')
    # print(response)
    if response['code'] == 1:
      share_box_res = shareBox(headers=headers)
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def shareBox(headers):
  """
  宝箱分享
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}invite/shareEnd'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('宝箱分享')
    # print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def friendList(headers):
  """
  好友列表
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareSignNew/getFriendActiveList'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('好友列表')
    # print(response)
    if response['error_code'] == '0':
      if len(response['data']['active_list']) > 0:
        for friend in response['data']['active_list']:
          if friend['button'] == 1:
            time.sleep(1)
            friendSign(headers=headers, uid=friend['uid'])
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def friendSign(headers, uid):
  """
  好友签到
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}ShareSignNew/sendScoreV2?friend_uid={uid}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print('好友签到')
    # print(response)
    if response['error_code'] == '0':
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def sendTwentyScore(headers, action):
  """
  每日任务
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}NewTaskIos/sendTwentyScore?{headers["Referer"].split("?")[1]}&action={action}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=30).json()
    print(f'每日任务 {action}')
    # print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def watchAdVideo(headers):
  """
  看广告视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://kd.youth.cn/taskCenter/getAdVideoReward'
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  try:
    response = requests_session().post(url=url, data="type=taskCenter", headers=headers, timeout=30).json()
    print('看广告视频')
    # print(response)
    if response['status'] == 1:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def watchGameVideo(body):
  """
  激励视频
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/Game/GameVideoReward.json'
  headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('激励视频')
    # print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def visitReward(body):
  """
  回访奖励
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/mission/msgRed.json'
  headers = {
    'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('回访奖励')
    # print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def articleRed(body):
  """
  惊喜红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/article/red_packet.json'
  headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('惊喜红包')
    # print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def readTime(body):
  """
  阅读时长
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/user/stay.json'
  headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('阅读时长')
    # print(response)
    if response['error_code'] == '0':
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def rotary(headers, body):
  """
  转盘任务
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/turnRotary?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘任务')
    # print(response)
    return response
  except:
    print(traceback.format_exc())
    return

def rotaryChestReward(headers, body):
  """
  转盘宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/getData?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘宝箱')
    # print(response)
    if response['status'] == 1:
      i = 0
      while (i <= 3):
        chest = response['data']['chestOpen'][i]
        if response['data']['opened'] >= int(chest['times']) and chest['received'] != 1:
          time.sleep(1)
          runRotary(headers=headers, body=f'{body}&num={i+1}')
        i += 1
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def runRotary(headers, body):
  """
  转盘宝箱
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/chestReward?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('领取宝箱')
    # print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def doubleRotary(headers, body):
  """
  转盘双倍
  :param headers:
  :return:
  """
  time.sleep(0.3)
  currentTime = time.time()
  url = f'{YOUTH_HOST}RotaryTable/toTurnDouble?_={currentTime}'
  try:
    response = requests_session().post(url=url, data=body, headers=headers, timeout=30).json()
    print('转盘双倍')
    # print(response)
    if response['status'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def incomeStat(headers):
  """
  收益统计
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'https://kd.youth.cn/wap/user/balance?{headers["Referer"].split("?")[1]}'
  try:
    response = requests_session().get(url=url, headers=headers, timeout=50).json()
    print('收益统计')
    # print(response)
    if response['status'] == 0:
      return response
    else:
      return
  except:
    print(traceback.format_exc())
    return

def withdraw(body):
  """
  自动提现
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = 'https://ios.baertt.com/v5/wechat/withdraw2.json'
  headers = {
    'User-Agent': 'KDApp/1.8.0 (iPhone; iOS 14.2; Scale/3.00)',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  try:
    response = requests_session().post(url=url, headers=headers, data=body, timeout=30).json()
    print('自动提现')
    # print(response)
    if response['success'] == True:
      return response['items']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def bereadRed(headers):
  """
  时段红包
  :param headers:
  :return:
  """
  time.sleep(0.3)
  url = f'{YOUTH_HOST}Task/receiveBereadRed'
  try:
    response = requests_session().post(url=url, headers=headers, timeout=30).json()
    print('时段红包')
    # print(response)
    if response['code'] == 1:
      return response['data']
    else:
      return
  except:
    print(traceback.format_exc())
    return

def run():
  title = f'📚中青看点'
  content = ''
  result = ''
  beijing_datetime = get_standard_time()
  print(f'\n【中青看点】{beijing_datetime.strftime("%Y-%m-%d %H:%M:%S")}')
  hour = beijing_datetime.hour
  for i, account in enumerate(COOKIELIST):
    headers = account['YOUTH_HEADER']
    readBody = account['YOUTH_READBODY']
    redBody = account['YOUTH_REDBODY']
    readTimeBody = account['YOUTH_READTIMEBODY']
    withdrawBody = account['YOUTH_WITHDRAWBODY']
    shareBody = account['YOUTH_SHAREBODY']
    rotaryBody = f'{headers["Referer"].split("&")[15]}&{headers["Referer"].split("&")[8]}'
    sign_res = sign(headers=headers)
    if sign_res and sign_res['status'] == 1:
      content += f'【签到结果】：成功 🎉 明日+{sign_res["nextScore"]}青豆'
    elif sign_res and sign_res['status'] == 2:
      send(title=title, content=f'【账户{i+1}】Cookie已过期，请及时重新获取')
      continue

    sign_info = signInfo(headers=headers)
    if sign_info:
      content += f'\n【账号】：{sign_info["user"]["nickname"]}'
      content += f'\n【签到】：+{sign_info["sign_score"]}青豆 已连签{sign_info["total_sign_days"]}天'
      result += f'【账号】: {sign_info["user"]["nickname"]}'
    friendList(headers=headers)
    if hour > 12:
      punch_card_res = punchCard(headers=headers)
      if punch_card_res:
        content += f'\n【打卡报名】：打卡报名{punch_card_res["msg"]} ✅'
    if hour >= 5 and hour <= 8:
      do_card_res = doCard(headers=headers)
      if do_card_res:
        content += f'\n【早起打卡】：{do_card_res["card_time"]} ✅'
    luck_draw_res = luckDraw(headers=headers)
    if luck_draw_res:
      content += f'\n【七日签到】：+{luck_draw_res["score"]}青豆'
    visit_reward_res = visitReward(body=readBody)
    if visit_reward_res:
      content += f'\n【回访奖励】：+{visit_reward_res["score"]}青豆'
    shareArticle(headers=headers, body=shareBody)
    for action in ['beread_extra_reward_one', 'beread_extra_reward_two', 'beread_extra_reward_three']:
      time.sleep(5)
      threeShare(headers=headers, action=action)
    open_box_res = openBox(headers=headers)
    if open_box_res:
      content += f'\n【开启宝箱】：+{open_box_res["score"]}青豆 下次奖励{open_box_res["time"] / 60}分钟'
    watch_ad_video_res = watchAdVideo(headers=headers)
    if watch_ad_video_res:
      content += f'\n【观看视频】：+{watch_ad_video_res["score"]}个青豆'
    watch_game_video_res = watchGameVideo(body=readBody)
    if watch_game_video_res:
      content += f'\n【激励视频】：{watch_game_video_res["score"]}个青豆'
    # article_red_res = articleRed(body=redBody)
    # if article_red_res:
    #   content += f'\n【惊喜红包】：+{article_red_res["score"]}个青豆'
    read_time_res = readTime(body=readTimeBody)
    if read_time_res:
      content += f'\n【阅读时长】：共计{int(read_time_res["time"]) // 60}分钟'
    if (hour >= 6 and hour <= 8) or (hour >= 11 and hour <= 13) or (hour >= 19 and hour <= 21):
      beread_red_res = bereadRed(headers=headers)
      if beread_red_res:
        content += f'\n【时段红包】：+{beread_red_res["score"]}个青豆'
    for i in range(0, 5):
      time.sleep(5)
      rotary_res = rotary(headers=headers, body=rotaryBody)
      if rotary_res:
        if rotary_res['status'] == 0:
          break
        elif rotary_res['status'] == 1:
          content += f'\n【转盘抽奖】：+{rotary_res["data"]["score"]}个青豆 剩余{rotary_res["data"]["remainTurn"]}次'
          if rotary_res['data']['doubleNum'] != 0 and rotary_res['data']['score'] > 0:
            double_rotary_res = doubleRotary(headers=headers, body=rotaryBody)
            if double_rotary_res:
              content += f'\n【转盘双倍】：+{double_rotary_res["score"]}青豆 剩余{double_rotary_res["doubleNum"]}次'

    rotaryChestReward(headers=headers, body=rotaryBody)
    for i in range(5):
      watchWelfareVideo(headers=headers)
    timePacket(headers=headers)
    for action in ['watch_article_reward', 'watch_video_reward', 'read_time_two_minutes', 'read_time_sixty_minutes', 'new_fresh_five_video_reward', 'first_share_article']:
      time.sleep(5)
      sendTwentyScore(headers=headers, action=action)
    stat_res = incomeStat(headers=headers)
    if stat_res['status'] == 0:
      for group in stat_res['history'][0]['group']:
        content += f'\n【{group["name"]}】：+{group["money"]}青豆'
      today_score = int(stat_res["user"]["today_score"])
      score = int(stat_res["user"]["score"])
      total_score = int(stat_res["user"]["total_score"])

      if score >= 300000 and withdrawBody:
        with_draw_res = withdraw(body=withdrawBody)
        if with_draw_res:
          result += f'\n【自动提现】：发起提现30元成功'
          content += f'\n【自动提现】：发起提现30元成功'
          send(title=title, content=f'【账号】: {sign_info["user"]["nickname"]} 发起提现30元成功')

      result += f'\n【今日收益】：+{"{:4.2f}".format(today_score / 10000)}'
      content += f'\n【今日收益】：+{"{:4.2f}".format(today_score / 10000)}'
      result += f'\n【账户剩余】：{"{:4.2f}".format(score / 10000)}'
      content += f'\n【账户剩余】：{"{:4.2f}".format(score / 10000)}'
      result += f'\n【历史收益】：{"{:4.2f}".format(total_score / 10000)}\n\n'
      content += f'\n【历史收益】：{"{:4.2f}".format(total_score / 10000)}\n'

  print(content)

  # 每天 23:00 发送消息推送
  if beijing_datetime.hour == 23 and beijing_datetime.minute >= 0 and beijing_datetime.minute < 5:
    send(title=title, content=result)
  elif not beijing_datetime.hour == 23:
    print('未进行消息推送，原因：没到对应的推送时间点\n')
  else:
    print('未在规定的时间范围内\n')

if __name__ == '__main__':
    run()
