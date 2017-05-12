package com.ylzssj.wechat;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ylzssj.wechat.util.Sms;

@Controller
public class RegistController {

	public static final String BASE_FILE_PATH = "/usr/local/customer/";

	@RequestMapping("/regist")
	@ResponseBody
	public String regist(HttpServletRequest request, HttpServletResponse response) {
		
		String city = request.getParameter("city");
		String area = request.getParameter("area");
		String phone = request.getParameter("phone");
		String targetPhone = request.getParameter("tphone");
		
		/**
		String xiaoqu = request.getParameter("xiaoqu");
		String shi = request.getParameter("shi");
		String ting = request.getParameter("ting");
		String wei = request.getParameter("wei");
		String yangtai = request.getParameter("yangtai");
		
		// 保存本地文件
		DateFormat df = new SimpleDateFormat("YYYYMMdd");
		String day = df.format(Calendar.getInstance().getTime());
		String writename = BASE_FILE_PATH + day + "/" + Calendar.getInstance().getTimeInMillis() + Math.round((Math.random() * 100));
		//String writename = "D:\\" + day + "\\" + Calendar.getInstance().getTimeInMillis() + Math.round((Math.random() * 100)) + ".txt";
		BufferedWriter bw = null;
		try {
			File file = new File(writename);
			file.getParentFile().mkdirs();
			file.createNewFile();
			bw = new BufferedWriter(new FileWriter(file));

			bw.write(city + "###" + area + "###" + phone + "###"  + xiaoqu + "###" + shi + "###" + ting + "###" + wei + "###" + yangtai);
			bw.flush();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (bw != null) {
					bw.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		**/

	    try {
			Sms.sendSms("【迎亮装饰工程】目前有"+ phone + "咨询，"+ city +"的"+ area +"平米房屋装修事宜！", targetPhone);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return "success";
	}

	@RequestMapping(value = "/showCustomer")  
	@ResponseBody
	public String showCustomer(HttpServletRequest request, HttpServletResponse response) {
		String dayDirPath = BASE_FILE_PATH + request.getParameter("day") + "/";
		//String dayDirPath = "D:\\" + request.getParameter("day") + "\\";
		File dayDir = new File(dayDirPath);

		if (!dayDir.exists()) {
			return "fileNotFound";
		}

		StringBuffer strBuffer = new StringBuffer();
		InputStreamReader reader = null;
		BufferedReader br = null;
		try {
			File[] files = dayDir.listFiles();
			if (files != null && files.length > 0) {
				for (int i = 0; i < files.length; i++) {
					File file = files[i];
					reader = new InputStreamReader(new FileInputStream(file));

					br = new BufferedReader(reader);
					String line = br.readLine();

					strBuffer.append(line + "=====");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return strBuffer.toString();
	}
}
