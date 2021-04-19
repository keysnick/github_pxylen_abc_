/*
更新时间: 2020-09-26 8:46
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异

请自行抓包，阅读文章和看视频，倒计时转一圈显示青豆到账即可，多看几篇文章和视频，获得更多包数据，抓包地址为"https://ios.baertt.com/v5/article/complete.json"，在Github Actions中的Secrets新建name为'YOUTH_READ'的一个值，拷贝抓包的请求体到下面Value的文本框中，添加的请求体越多，获得青豆次数越多，本脚本不包含任何推送通知

多个请求体时用'&'号或者换行隔开" ‼️

*/

//let s = 30000 //等待延迟30s
const $ = new Env("中青看点")
//const notify = $.isNode() ? require('./sendNotify') : '';
let headers = "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBCcm2GMY5HbKZykUaV1Q2SK255C12Bl5n8FPQ-mqYRTvawQ6Q86pR8lE2LjIg_dy_RLm-gQIamm6nZp85QhJW6ZU6olQGjnVnYEElTsrbUeSFecpAwG_Cao7igd7EOnqli6TJdn28PWN7XNeRD8e05yV3Y_5SGN7oOG4zHvdRjEujP6-OvN_TWi9XXU6CSL-LGkERBqH-4mLMQS1k8CvZQfqx-IhC_SLN1LsMzxFL_sqQgu90VGwb0ePWt1_Mv5pYRdIduUnQezSQFU_cJePdzNmIQrK0lkziTgCzKptK41f57eddKkPje9wlowXmBX2XE5QfCFQFW0OQv3DVno6naVJp5Z2PeLxS6Yng3kdNh5Nkm_GbtOg4D5rfE5V6r79ZgDhI_lYkhx9f5zi36TQMhzhN-I47_7sjTLsU4dtTHO98fz2QJ0I-sXzFQnBTdzGjeKjpaDeOq31SDZd5CyCWMZyRY3tubbt59LZqczlVJqg5t0gGM5O0iQzWU7nVa2TJNeJJjdzfIUyxphKXxafIXnx-JCV6fCyemzlzTy5Gsg1p4JovaoHb1_rInaMr6eSXfx8-_vMZCeXB2XNicf_6DHs_IF_xe56bJWRQGpij0SRDUtGaJb8Vw-tqOCqbrZU1nBe28WFPnj3gqisnYcyOz1J6esDJG6XBXcMvmr3rSWPOa6mnwmHHeK&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBCcm2GMY5HbKZykUaV1Q2SK255C12Bl5n8FPQ-mqYRTvawQ6Q86pR8lE2LjIg_dy_RLm-gQIamm6nZp85QhJW6ZU6olQGjnVnYEElTsrbUeSA20feW_yTNTSm9vh9AKtjsXUp30MK6vW_AMUTigOHsylUllc9wi1K7W4fGk6vq8CfOVRje8B67IKv-_nyxl45QiHWpQkXRWovAl00W2O3HeLh1JpTqDjQgVWNskOP5aSjHCoipWnYRyxb18Do2rLmivceA8B4lvNaU7CSlaKxZ4tgkJlcUmPHX2GfYAh3ZnT31C6vti-OGGA8HC-XMwCSIOCPckwkYVy23vIBce-0YLuZeQacE0fUKEtFMyiddCtKEX9TbyUeFa0qxbKlN30y84vtgyoZtPBflNo44SkfgowCXX16kKEETQ7cwJM5GNxwV3k5DC8yL1CrGPOhPWInn1niBY5LpHti_bewynlUD7Ux2kf_rRMTKFrTymlViCp4UsMSvzDA-GbrTdpP3iErG_JOoM4ipAmldabRWa8Ikdfg2gP3zopQnX_yGHraP4pJ0uBQBQheK8naG0YA2BGcPaFTIgTnBCVzzlEMd4LLNlozZB9r3hJ9s5hGLyLuqjF_sUI0eMCMyRC_sKI7RI8RsOMgAkPddUs13qs5ZQCghQRQB9bE0I5RP8WZ2lQSV3ggrQ27xDSy7V&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBCcm2GMY5HbKZykUaV1Q2SK255C12Bl5n8FPQ-mqYRTvawQ6Q86pR8lE2LjIg_dy_RLm-gQIamm6nZp85QhJW6ZU6olQGjnVnYEElTsrbUeSOw2eXxxFsPJKbQ0BD6aH9L_sVZ8KtyUox0_OWU9ygywVYYrF_9d8_LrfJYkn3yojkVYLj5Hps1zVnjv382VsBLdSviynDfFVec3LOUGh0mJaBXaIYZLZNOme9h8sML1IAbBRLHjSgOdUM2QsLKlboCBPZP6uLjWZEuH-ApxPUEajsX1tfdWc_y3k7cPHwz194BG6RHGCcGu-sulySbm8LIwQnR0VsqSTLx8qk-XCm4JgjY2dgtvtezAPi-014drCAdYTYAuLpUgC4JCeUtWuKbthDJe7lfB9OjsBL6eCpq1lCQoIxFYhIM6QPKRiRIib_nm-NaSTnNh8NJ6fyDTYrWqSd0MY6io7c0Pv1zU-AQDrgRsFuZLOUzrrBZK4Yoct6x8Ez2fJdqqz_RPnwQsrdqxK261tDQsEgNsUSe4hxteHFjffBDSm-6iiFRuLT0-dmD8IgoVCbPRxPqAZZ2FAsOeOvOxPiP_KI_fF3N0bS7q5yEDmJxxibZzB4IqFyvor6hoijtS85MGW7fLHoEy8Q88oLP4PuP92xLL3nKNIbs6Qff_InlgiiK3kI3JmEF4OZeyAEiCdjm_&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_mEtDEGsOrBruuZzIpWlevTEf2n4e6SDtwtHI8jh7tGLFm1iscPtbZwlhO1--2rPMqEVay5SHQZ0Xa5om9y_QnFioIoDSg-ArtrfwznZt1IhRAOspLNm4F1Z4mRILDUTDM9AS-u45jBCcm2GMY5HbKZykUaV1Q2SK255C12Bl5n8FPQ-mqYRTvawQ6Q86pR8lE2LjIg_dy_RLm-gQIamm6nZp85QhJW6ZU6olQGjnVnYEElTsrbUeSDkdjdntImZ1t9NrKtmR4cwOQy1Cm4xjtJEzF339n4NiQ8hDsBT3-IMh1bNuBjIrsCvCLtTbY8vyJackgpu0JHixO-t-5q23gpqRhbV694kADTpJI3haMdY81KBsNFDIRbZDdB328-bU_VoOVBK8MtFN_U_8c04dM5xQnEJVRCpLLEKoLQs7FobxY-MDtkUYv6xuGejmNLZ-xr8wXaxkaXISOugN0T3t_Kygu0q4CTG49-g5aWvXEjjv2HU2z0aGD26e_RgH_ZOYSB5rUMIBmGNJfx4hdWXVeqCgNB4r725iS6FEnVRp7ehCN5krT1dVouDUqQa1YKWmvRowjy7yM_MDbrk334I6pLs8d9sSDkZbbNnZlYXcDfMyqfr491_3p7dJV3FWyQ0QZQkNalm4tJjJA14CGc5FbYkXtSEn7-rsYoreW50Mu6jET7Qh1brSrTB5A50LCuHTW9KIRCU8uMfMcXs383Ei6-2ztAryzxm10VPol4QpeX_u2qxQVxtSwD6UEEvk3CJ4N4j8W3rF3HLm0W_LYdzxJrENFk6HIfGb70HNf7omikNV_JmLdlx90g%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTMqpDtgs3aDDQmOiFArf1p4tfkY9T9RWExESFsz-YfqOL4rlRtHBcuyXdsUq1WweTtkckkbyosBuMgxQ_vRpkfp9byRVLNzwvdgVLw8iAXaeKGqJplbSlOVBMRzlW7_DXGadK0IQGx8dw5_44Vt9LqSngk_z02_Ultxj_VfaJfJYQTLZnodWk_lcF3hdSOzjKzOsWBSS-zZnwkm2ufI35WHpTnoIEBr3hNjMqUR9tShJSLreoaplhl8tEgstiBMA_n2gLUMQhiRwiNDLnrH6ieVkCatSACO7McV1PZYBwmYDOzPzZParHbpDpmaLQ_INaT8PK0Bifo97s35BODSD1mQxI1mreGPXrhOh6Wke8UwA-rizKy5KbN_fHHAd7-wrUDQ9PeYpcvAJyaJZ8UYlJ5PJPDUAvL_dh2_DEkv3sg4k5pk7QuTWSSyN5Fd6Q9QMwuCnWy1sLRp1N88CILJQL7a_gPuOVslJ0gae2GhiZvEWzdq-NgXVFqkrsdcbPf86O3EHD-qzsPUNfuYLGbf3uv3RO2c36nD94SnxbyLqcy9Gb3PcKTiPdHHBmNpy9agCig%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTO2FCWn2Rp1zRZ6Uu_F9LdBjdrgjo75Iku_JT-Cg4OPNqQGG-KzPe-5jPI3rJvVE6GHitRKBc-a1vumn5mxyRPhmJsvYRHQO5uTf85aQ3ai1WBvSQajspAy1QyWxd3ZnhzTtrTZohY9xbUe7Z5w3t1YifpQt70M_-yfQjl_yWDq_yF9VLdJy1sKenDT_zuXMTSNE_XLoWfhE6-VJdynEBKqmkmlx6EbO4NyIrtCPvmaVLzNgSV0CfsXYNKOwOcnUBJbri9JucEtw0WgJYjRPxjeQukAxDo2_cak2p09rJXwsPN8qmHSb6VR83-k-pklZKpqKNfQoaTLWI8uoDvS79ODN3tWTc5Q9oCLrbWQNKt4SOFqp2t8d9rtSRO5n29dsNnUJElrOGmMS15T4AuwY9U67M-1dBE8O2bNkxT2O0YqVnYvb5XxJWBzKkMye9jIGTZWWivAeKnkIh2vim0kdQNdetkoI8cYZa_SQ432esyIcVEouZ4-6_E2y3Fv7BpxgfoFWh_WWWlZR7K1__uDeuShDNonOXxw-yNEoZ6uUIB_g5a6wR2PsNLofmsOMi78mLQ%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTKSzbWmI7ihz2eJxk2eF3lB2m9I7FVPxpHOa_PkbLA-ZSHzhcM0e2QspCekLhBbAxfS5ZVTRxB8TXAtBHIbGdKLYFzSsxTCgqeub3653sKkjt5QFk0-8GFtnJD0hfz_Ts3d-9zKitjb-MCrIWwSbVJUCIJqnFwxSQ2ryWAW19cP9MDN2HkTkcdDISyK6k09__8bKvtqoaMj5zpJS5OCcwFC9cytYzsobdI5a3sJPG6JNRdBDzbxHLjGMohZkbTO8EMEGN0510DMbdDp-KnPiOrxVS-ZX-pDQMeHA6dMipoA0VzzVNHreSq9iF9-SMkXXRFd_-urGGh-DH-4ylc-0cazqCv2DjSyINkhGR1NAK-dQaoaRZ0_m7rpxD22K7859tHYv5NHe9sBL4ZA5FCtFn4veJKxowQEA_09TpI5yVDGfF9-2aaJvjrsEtNxLfxZm2PIAuPQ0a1KOgJG0xizN9y_e3pTlJIIoWMbtcD2ohYDNftLyNR6AN4HgWramDYTSGRlEfs6m7jhjhv6hSeCadTONqMTPUAellK1e6eBmqMS5Y4tfwxmc7zg2m3xZ4asbaA%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTKpxLxuealqH9V-lbZIa1Nk9nPA9MYTKz0eGWQuonobdhRZC7WPgE0OYCNcviM76f1c5282AH2pSEw7pJWzSwwk6hK1vgMBjm72DxPK3YbOYon3M3CzsVH_dsY-FWmtF1PjfhevLKisViflI2dWzWejIbZ59WGnzFy-1HO8cz240wPZYYFZIxaHChVHhX-FasHLP7kihKBNrJX7Rq7Tinw_Tjn5kh09AxmhS5oz4glemgnqKPi_wqY6-_GlHKk1vE_XYOT2YxlAqhbasqMAndhixOngg6N1BJNo-PtcPdR4RdxacQAp0DOzvLghnl9HRl3R4eh1CMgop254D_Zu8eGorA298Vli6yy4zBU4t7Y82PfhLH4F735orUbPjsUQQqvD6LEBbncKj9OIuUDk8qKjYxf04cfxwR5kl1ZMeSWC_jWfsqNj7IdNhkuNFLXm5Mv1v3yGOK7V5YpK3i5ns4v2-9z2RI1iUeHwu0mZ8vCBbMdnKHOwDXN3k4d4hV7dzAPYykTkqiSIGQZRIzawO4TB6ttglkon7zJGB2nA-xQNqV2U3FMraer3MFHuGdd0g1A%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTCoLTmGC2N_ZrdgqW4XV4nlj0fuW37j0613tlQdJJaOR9nEMPPvv_0f5t5dOmzKAiLC5ryie1EHTjxD5sL4rYOFgl5QoAlAIGD3tS7iHmkYhssXzjDPAIJXEM_5NBUgNMEMgsU4LJKzkRi5CKEpC_PJF6JGcXJ3YzYRRG9hM4Aim87NhNhs1KUTo00MHGPCgHlyBOSrMQf69nH58MNUBFfLv3_CS6BdEUOdhsunJTsxAV50Qoy_mr2sFqXFNhiHsaEOp0eFwZtx5PksnRZ03hSjBCZ_w-HZWUm43GxHY9SPM81UB6wJt4jMuAeL2bhbBUQw3KOgfUSss3fVS46dqs5limEEMP7QoEFe2Z9msOncYRFsp916TQzlQZHl-Uwbtox6SRIBUa-elDrlBowkV4CgfYgUo0VrUW5vrEYvdTPKFHvd57wAdmz5F6nTMNPed50sy9yRhpySFqKpnoLiiDop1_jhcI3QmfK10fmv5IBDegPtCetwVc7EtLBeYthrClRX5aQ0CYoEM-TyT4spmtJk793Zxy9bzLJsligf_gVGcFKnFzS_XL4HrpjEkryNxIg%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTMcwwuA-1NVcyiabI7wTsdQLYRipc9s5PMFQ_XZygxwUB0OPxbTCGYWzLAKRUsEpgLd5bvY_dk3rADc2RnD5HDmyCfxAYolew2ZwSJhSG0QS5Kk4Thtbq5o7TE6Mytb3R_aQ4Yq7whUpKMEQLr2OoiHGuR5iRjKT_0NzUP4H42BGCPlzhcxs6dfFX0HEwZCVxRO3Q96BFWjQceTrmiER598OiDsFJGooDxclWfoTKu8T-UunhUcI3glTFKnu9hkw7Dmo9C3EHNlNIHho1BBUaG_R8o8ocDbJw4pUkzFlVrlgRcUkFA8kHPkm8O_aurTxNALDRfI3_ntXt5oagUK17X_qNHWzssViTC12fH0GwArJRhAdN9wufKYNwZxNQ4ldF-vouMSQ-lyB4Oci53D6dQis0rsSQys6-T5unj4CJqkHd46XAecCjyI1cw_xF7dGgsDaAocDuuI5mBS-_YVbue9fzmRuMEU64d5jTXUOhmHuj037_98pDeA0Ei9ZHvXocL6zaLTiT-o_1ffwbWQH3QUiyJBYxAsfYZ83ac2gDPRcGWRfIPWc5dXXlGB0UFYVbg%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTNlk3fFn7qljxlqa-wgDNtxMeWm9kjm2UEuEkgHzAVQWqe33-5TL8mY2nV5Lgd24lYG1ztNw6lAa6XQWHihoEO5NTJzVzlAi3KjA1bwzg4IquiR8Nzubao1Kbul9hYNhTmN5pxLiqN-6Fn8Z3lMUkWY7_p851ps9Fl3Y1mpa6mx5UYfXs-iYuwhgYggSXpvDn4VavuYjn13z0coMq9bheO4LmGK4n4qUFOWMW-CQ_pbL3pRqioCdtj1cPeSMAj1UWBWCVD3AWaSbSpPLvSAqOFiNLSchH5dyl38ker7GqW8325Wxysl5T0AXE0P6pQQ79H2ulJ_1KNnPgHX5EJ4vgKkzTycigOOTPZe2UNIWkvFZS_pJCsGx7B1AnHcknO0lnxwuqWclJNLxOWQ2A2uD0Wz6Prk6B96ilFpdTdjVL1IJhZtN19xYw1XnNdx66dtTvnFB9cX9xjrX7QftREAt1elQKBO6ke6uv1onHMBpnGWzuXDyd1ArdfMa3Q59BiqezSFoGuXEWt-PZ161CKqPb9y0u-tn9xXkT8jpNOGXdnf1-lNDKpY5wXuSx-Kz8ECUTg%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTNlk3fFn7qljxlqa-wgDNtxMeWm9kjm2UEuEkgHzAVQWqe33-5TL8mY2nV5Lgd24lYG1ztNw6lAa6XQWHihoEO5NTJzVzlAi3KjA1bwzg4IquiR8Nzubao1Kbul9hYNhTmN5pxLiqN-6Fn8Z3lMUkWY7_p851ps9Fl3Y1mpa6mx5UYfXs-iYuwhgYggSXpvDn4VavuYjn13z0coMq9bheO4LmGK4n4qUFOWMW-CQ_pbL3pRqioCdtj1cPeSMAj1UWBWCVD3AWaSbJmUyDaWkEUNls5a74OKeLNueQ8ausO0iYoN68R4kRIRO9jORXU8lNG4CF20kbtFxsLrvSHLGRJf3ql_StmCuXKsji_i2y5mr_2ZbPparE-VYoaAlgdO-xhVi44dvq36n11nJT6skT-jjlwdiX0f24Y9Dok5H00ZLCOp2AR8K8UwS3RXPn84Ub_g0GUoKujQHPweaXWI2CppDw_s2hWEZCIVQTf46g8Jju8RDkpqC3mSJdWCAU9iSdxfyTgJjpmm2ZLNM60IZSEaHdkTlibd_crDXM9IzWtNwtg5ehyCEOgF2lyUFzs7nSA%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_kF97hamPuz4ZZk3rmRrVU_m2Z51XN3szZYaCPxNG07BYjyjwYkBVGTfTGYPVecze9u-jGHCQmfvey4yZrPyKR-cA01PbV3h61GBiHFc-skGrpoDK0eliCfJPX7f9_IVT-MEKcW_xpZDBt9WJyAFp0-zkfL8mPzBELnMQ6vgY9J3NKnKehcbPDHXoDnNe2NtGhXVB_gLf2uWIvFn7XYIqS0p3f5QdBo0725AocTRk1ye6biPYPb8UTNlk3fFn7qljxlqa-wgDNtxMeWm9kjm2UEuEkgHzAVQWqe33-5TL8mY2nV5Lgd24lYG1ztNw6lAa6XQWHihoEO5NTJzVzlAi3KjA1bwzg4IquiR8Nzubao1Kbul9hYNhTmN5pxLiqN-6Fn8Z3lMUkWY7_p851ps9Fl3Y1mpa6mx5UYfXs-iYuwhgYggSXpvDn4VavuYjn13z0coMq9bheO4LmGK4n4qUFOWMW-CQ_pbL3pRqioCdtj1cPeSMAj1UWBWCVD3AWaSbMg_9g4vmdIOtyPFcT1WG-rAJVwRtC8Veo_DlPPnOnocEVuwdWh1RpTmsb5n0HcNR3T9qSX-Jie5BL-Qdgj1OIPeQ5HHCHBeaLHowsHDbQrDDIkUF-iRK7BWdW2G9Mx0_f5zoyknnMbOdIbkOx7MS6SVl8lFXF2fsXddtk0AwsSRA3dDq43__OPts3DFlzzKGxN0DfvUzWOxigqUkigzDyERxWRVlKaw9fhQf5JzhCrehJTKOrKD5ZWQ3vJNk-BEMHVDRgSE1xHPBQGH8m9v3rQ7R5LIso9k_4cJ0eGdHiCBOEFtZVSCLXg%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_nHSVk1s5Pk1lOQlYKzDUPU9y0FiOH2nIRqKp1NEljKT7rNHR8sm-zNM1uYF037ZLhJ3Xl0xswFUmY-cQ_hr0wixkQsFjVI3HBBKV9Vi7Arv9ucr9IYetIj9Zqs0mPLwQax27ryeUONn6pEl5i6NGOxvfA55E0P8X-RUk1Iw9JffY2KTtiGhUmI1se6nDh36lOAjlC8qfIfcwDmolwwANzgaozTt07J-oSmyo9Wc75Sr9yWlS96dCJUbN4NtmaJE8w2tOdvOqdTySskcMV8x5QX9vVHN6ij6xMo246JEoWUnuRaYdDhBy8IWEW7NKqduvVTJOMNODqeldnpoRV5PT7UDuFdRSW8uLrjZ1xpuhrTq6ZG5VS50bniFjjB2G5iBMjA5kpjf2_Dq6XLRXhCVzNPpe9R1AzCEIHthBX_B5-2jlK-FCcxeYXIRV-LhnIGEEkIZn3DdVfDDNlS0aGdMpQYPzGzS3JR8LbhFjFUe3mwmaYOGw5CchSA9eboXj5pKsAxsKwKgZpQwqMkQ7-O8YmSb3SKmOwIz0MbVzLPvxyvr0cQRqEl7rfq4Q73cHLu023lSxPIa8nqVRon2wegoDa98h-2FXhiuORR0hsLSxJic2r8-PmDO0D5pwrtXByCFSqBtuDQBqbAB_bcLZs-5oTAwhOdBJVnnXRSbTHWtvpkWcSPKYo0_8lBVH0i0oze0TKAbl6GLkrsTgBoadR_IoHZxCqSBiWyS4V_ylHpB6aO4608GrWSED8V84h4vlCKtz5StCMxJUWmqpaIxKhxtHy1scE5sLr1d0Z-m6y3Hhd_Yt8y46LT5QuQ%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_nHSVk1s5Pk1lOQlYKzDUPU9y0FiOH2nIRqKp1NEljKT7rNHR8sm-zNM1uYF037ZLhJ3Xl0xswFUmY-cQ_hr0wixkQsFjVI3HBBKV9Vi7Arv9ucr9IYetIj9Zqs0mPLwQax27ryeUONn6pEl5i6NGOxvfA55E0P8X-RUk1Iw9JffY2KTtiGhUmI1se6nDh36lOAjlC8qfIfcwDmolwwANzgaozTt07J-oSmyo9Wc75Sr9yWlS96dCJR33LXM_e7a2ZoH6_Kp3hgJL92L7fqUdId7RayG7v8-CwxXBN-O6ceKk-e56-EWZerXamnJMWm3uvkYpxVq9CAjPl3NEwBt8fs4RLnHacuCD3IfxhiulWfX38olG7-J2OP0_x-65sWVCvqDGJRPuRsIPBxTegF3rr7_PlXxudEgNlKU5hCqvM69hPtRRWF96GJxzves-5bbjwoHmVaRk8tmJnoErTrK73oQc5QecwtbBbSGSxwYxYfDQEhIein39fXE-BRYMZytcp0wWYysUBKAs8XXZ7ftnGTcMrxoXQjKgo1iXjLLo96dYvDYed4VjBzWWE0-DfZ7vYTeHHCOFPv7deZN0bkBohl6MHCH9HjYgihgHSfJXERYq5xHk9O2paB4KUkpqVhICcJQbfI42zQ248QeGYSw3dFPO5cALuMXrBUbRxK4kypRW65qPiIVQ6KOdd1_WWYUbQeRv1BqcTJQ8xAjIn1zjeo_pWKGN51bUaSmWSqB9JhvmKkCdtP5eZfEGx1ZgSG4SAlnJvqKVXffyB52m0nVIb1KUMEPb0GlUq1-vzFEMvoG7zobHjmI8VA%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_nHSVk1s5Pk1lOQlYKzDUPU9y0FiOH2nIRqKp1NEljKT7rNHR8sm-zNM1uYF037ZLhJ3Xl0xswFUmY-cQ_hr0wixkQsFjVI3HBBKV9Vi7Arv9ucr9IYetIj9Zqs0mPLwQax27ryeUONn6pEl5i6NGOxvfA55E0P8X-RUk1Iw9JffY2KTtiGhUmI1se6nDh36lOAjlC8qfIfcwDmolwwANzgaozTt07J-oSmyo9Wc75Sr9yWlS96dCJRUwGuR4tzjJyM4luRQp1MOFZZIpemfa-jABZk34q5i8IS6UPTy2DNoTNBiO6VG2W4n1ls5XiT0gRQXGjSqr9_3T5Opw3Tf7eXAsF0ABrBAiB9QCnEvnwwAB-xCYeY3k3NSMBaCzDxrX2KAyNKHceFYmyH7B1E-CFKMwfIKz8hMV_sM4iCM1pfnYN_W2i_uN1r0APVtLD6FIK4AzFeCpa13oPWJ57rrGRWhfaHmhI6J8-eh99zNZffpjG6Mg1-8nC8m0qfwG72Xe13QjaKmuSiGcNPeVBmVdCybX7ZKzGtZF50WljAU0PwUZXuVr-wyqPIPUKnN3SQemLEaxvEm0BYXZEqnpCY88_R8avh31TWiLqsgKGwc5hVH00xxFE9H0oOKRMqUKim0naBubnZotYnHYIG6s-40Vf-lMiYNFSNARqyst6KlOo_gsfZbBeGkkfZzXVwNf6L6_Nb2wc7FYF5vr0R57oMHCKatZNOVwJfcPM4KczFkT4JLRdS6gsH-V3ItpcbowSIbaKGVIqhy9qKjWWDSpL_krg566KYKsFZEg1LuOPcpevJ1z7mnllLFV1g%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_nHSVk1s5Pk1lOQlYKzDUPU9y0FiOH2nIRqKp1NEljKT7rNHR8sm-zNM1uYF037ZLhJ3Xl0xswFUmY-cQ_hr0wixkQsFjVI3HBBKV9Vi7Arv9ucr9IYetIj9Zqs0mPLwQax27ryeUONn6pEl5i6NGOxvfA55E0P8X-RUk1Iw9JffY2KTtiGhUmI1se6nDh36lOAjlC8qfIfcwDmolwwANzgaozTt07J-oSmyo9Wc75Sr9yWlS96dCJYXFLPvoGtwtT398Cciz1JGQDyVk36bSt-5oiJ7jU7-mKk4jFZnlVc8n4lJ2GGjtipO73BC_4Py9OTGk4WkwSFNb7k7gtwVj8kzb1z0KlhQpi9Zbs07UU4pwrgizO034Q8ckJak3Okc8UTAIpkjKcj0JtI4ya7AuulXTkojnpQBGGHPDCAjjlJ1zCFaLThY-fSQvwwnh2QNsy9VIimccUqtJT0GdaBATxOib7tWug9uRBaOwIcFDUCzCyAij3-lfMwVKKB0dpSNYMDaboDpzojNusaTSrDDGrXk7xD0yR5Zv47JIdqIYIXyyZi_nGAvlrTiwOuc4tHxz8gY-fsb0Ntd_laFW7FhVQ1uQW5QM7trnBjT14lxv5UsytzhbjcFwLIrmpMg3dB3fKXgBbQWBLyaGyyBXq08PT6bpQcnbHiY5mc5fAPVUk1xYVGp8QNFvIwgJb-zSw2-YVzwiiiFRgbbzk4vlZvJ9DsYgz249t7JNYIlvpLZ9hXf-ziptieyEXzqCKPImrgrsVBaPuBInGMzrO2HEsR5kyzbyuz1BYCSqbSIyVkwFVq87_5SIx-dT8g%3D%3D&p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_nHSVk1s5Pk1lOQlYKzDUPU9y0FiOH2nIRqKp1NEljKT7rNHR8sm-zNM1uYF037ZLhJ3Xl0xswFUmY-cQ_hr0wixkQsFjVI3HBBKV9Vi7Arv9ucr9IYetIj9Zqs0mPLwQax27ryeUONn6pEl5i6NGOxvfA55E0P8X-RUk1Iw9JffY2KTtiGhUmI1se6nDh36lOAjlC8qfIfcwDmolwwANzgaozTt07J-oSmyo9Wc75Sr9yWlS96dCJTRHA_WA39xMFmD_D_joC2FuumP0Lrds_JNBkY3hpas7V9tsNrMPYhHWwU58HUGaRXIPyES8IOA30FFyUDex7vSGbCukk0W1RgthqiYJQwqgzPxOFwShr0bygHKBYGeENoQD5UydME8zAIO3oeU4gr-nJP_SABTsUCY1RLjfB7IFKW_R7LBrZR5wljVN2VgtSjHx4rmrgXOZDUEIqfGCvWuW3YbzsXA5zo1Ot4OtrJ1wAwK_4Il6iFDmsf6xJsYoeKPn90W6G0XhqvvtYPPR_beYUHbG2q2hJas9oeTU3EwSPXcQ-Tc-A9ThTdqza924EeHYjnxlE0xYHNOr4yxcsRmbMKMVZ01YyGJvYlbc2bFckX0HunxCSbdlEFaDytwgepVoB5ztSWAPE2qIweJX6CMvKUtwyX5cusy-B4x1fHwD3T-w5GQyVGoG031V-TizkHSIrZxKLaD0rSBnqhKhoiBh3XiayrENt7TF6POIIEl_6I5KOHbuR0QwISq8zxKFf0vnCPAO6JgPO95O5jfKA7Dz9ThXnf3lN7hMgMdVjTvFoVF7a_q6eC1OgnJlkGIibA%3D%3D";





let ReadArr = [], YouthBody = "",readscore = 0;
//  if (process.env.YOUTH_READ && process.env.YOUTH_READ.indexOf('&') > -1) {
//  YouthBody = process.env.YOUTH_READ.split('&');
//  console.log(`您选择的是用"&"隔开\n`)
//  }
//  else if (process.env.YOUTH_READ && process.env.YOUTH_READ.indexOf('\n') > -1) {
//  YouthBody = process.env.YOUTH_READ.split('\n');
//  console.log(`您选择的是用换行隔开\n`)
//  } else {
//  YouthBody = process.env.YOUTH_READ.split()
//  }

  YouthBody = headers.split('&');
  Object.keys(YouthBody).forEach((item) => {
        if (YouthBody[item]) {
          ReadArr.push(YouthBody[item])
        }
    })
      console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)

 !(async () => {
  if (!ReadArr[0]) {
    console.log($.name, '【提示】请把抓包的请求体填入Github 的 Secrets 中，请以&隔开')
    return;
  }

    for (let i = 0; i < ReadArr.length; i++) {

    try {
      if (ReadArr[i]) {
        articlebody = ReadArr[i];
        $.index = i + 1;
//        console.log(`-------------------------\n\n开始中青看点第${$.index}次阅读`)
      }
        await AutoRead();
     }catch(e){ }

   }
     console.log(`-------------------------\n\n中青看点共完成${$.index}次阅读，共计获得${readscore}个青豆，阅读请求全部结束`)

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function AutoRead() {
    return new Promise((resolve, reject) => {
       let url = {
            url: `https://ios.baertt.com/v5/article/complete.json`,
            headers: {
            'User-Agent': 'KDApp/1.7.8 (iPhone; iOS 14.0; Scale/3.00)'
            },
            body: articlebody
        };
        $.post(url, async(error, response, data) => {

         try {
            let readres = JSON.parse(data);
             //console.log(data)
           if (readres.error_code == '0' && typeof readres.items.read_score === 'number') {
//              console.log(`\n本次阅读获得${readres.items.read_score}个青豆，请等待30s后执行下一次阅读\n`);
              readscore += readres.items.read_score;
              await $.wait(30000);
            }
            else if (readres.error_code == '0' && typeof readres.items.score === 'number') {
//              console.log(`\n本次阅读获得${readres.items.score}个青豆，即将开始下次阅读\n`)
              readscore += readres.items.score
            }
            else if (readres.success == false){
              console.log(`第${$.index}次阅读请求有误，请删除此请求`)
            }
            else if (readres.items.max_notice == '\u770b\u592a\u4e45\u4e86\uff0c\u63621\u7bc7\u8bd5\u8bd5') {
//              console.log(readres.items.max_notice)
            }
         }catch(e){ }finally{resolve()}

        })
    })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
