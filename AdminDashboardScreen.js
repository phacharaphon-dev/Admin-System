import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function AdminDashboardScreen({ setView }) {
  // ข้อมูลจำลองสำหรับกราฟแท่ง
  const chartData = [40, 55, 45, 70, 60, 90, 50, 65, 40];
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."];

  return (
    <LinearGradient
      colors={["#FFF8F8", "#FFF8F8"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="menu" size={28} color="#7b5455" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>แผงควบคุม</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }} // ตัวอย่างรูป Admin
              style={styles.profilePic}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* --- Metrics Cards --- */}
          <View style={styles.metricsContainer}>
            {/* Metric 1 */}
            <View style={[styles.metricCard, { borderBottomColor: "#a73355" }]}>
              <View style={styles.metricHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: "#FDEEF4" }]}>
                  <MaterialIcons name="person-add" size={24} color="#a73355" />
                </View>
                <View style={[styles.badge, { backgroundColor: "rgba(167, 51, 85, 0.1)" }]}>
                  <Text style={[styles.badgeText, { color: "#a73355" }]}>+12%</Text>
                </View>
              </View>
              <Text style={styles.metricLabel}>การลงทะเบียนวันนี้</Text>
              <Text style={[styles.metricValue, { color: "#a73355" }]}>42</Text>
            </View>

            {/* Metric 2 */}
            <View style={[styles.metricCard, { borderBottomColor: "#7b5455" }]}>
              <View style={styles.metricHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: "rgba(123, 84, 85, 0.1)" }]}>
                  <MaterialIcons name="payments" size={24} color="#7b5455" />
                </View>
                <View style={[styles.badge, { backgroundColor: "rgba(123, 84, 85, 0.1)" }]}>
                  <Text style={[styles.badgeText, { color: "#7b5455" }]}>เป้าหมายรายสัปดาห์</Text>
                </View>
              </View>
              <Text style={styles.metricLabel}>รายได้รวม</Text>
              <Text style={styles.metricValue}>฿842,000</Text>
            </View>

            {/* Metric 3 */}
            <View style={[styles.metricCard, { borderBottomColor: "#a82d68" }]}>
              <View style={styles.metricHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: "rgba(168, 45, 104, 0.1)" }]}>
                  <MaterialIcons name="pending-actions" size={24} color="#a82d68" />
                </View>
              </View>
              <Text style={styles.metricLabel}>คำขอที่รออนุมัติ</Text>
              <Text style={[styles.metricValue, { color: "#a82d68" }]}>
                5 <Text style={{ fontSize: 16, color: "#514345" }}>รายการ</Text>
              </Text>
            </View>
          </View>

          {/* --- Trends Chart --- */}
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>แนวโน้มการลงทะเบียน</Text>
                <Text style={styles.chartSubtitle}>ภาพรวมการลงทะเบียนนักเรียนรายเดือน</Text>
              </View>
              <View style={styles.chartToggle}>
                <View style={styles.chartToggleActive}><Text style={styles.chartToggleActiveText}>รายเดือน</Text></View>
              </View>
            </View>
            
            {/* กราฟแท่งจำลอง */}
            <View style={styles.barChartArea}>
              {chartData.map((val, index) => (
                <View key={index} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: `${val}%`, backgroundColor: val === 90 ? "#a73355" : "rgba(167, 51, 85, 0.3)" }]} />
                  <Text style={styles.barLabel}>{months[index]}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* --- Quick Actions --- */}
          <View style={styles.quickActionContainer}>
            <Text style={styles.quickActionTitle}>
              <MaterialIcons name="bolt" size={22} color="#a73355" /> เมนูจัดการด่วน
            </Text>
            
            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.actionLeft}>
                <MaterialIcons name="verified-user" size={24} color="#a73355" />
                <Text style={styles.actionText}>ตรวจสอบสลิป</Text>
              </View>
              <View style={styles.actionBadge}><Text style={styles.actionBadgeText}>5</Text></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.actionLeft}>
                <MaterialIcons name="radio-button-checked" size={24} color="#7b5455" />
                <Text style={styles.actionText}>เปิดระบบลงทะเบียน</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#837375" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.actionLeft}>
                <MaterialIcons name="file-download" size={24} color="#a82d68" />
                <Text style={styles.actionText}>ส่งออกรายงาน</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#837375" />
            </TouchableOpacity>
          </View>

          {/* --- System Status --- */}
          <View style={styles.systemStatus}>
            <Text style={styles.statusLabel}>สถานะระบบสด</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={styles.statusDotWrapper}>
                <View style={styles.statusDotPing} />
                <View style={styles.statusDot} />
              </View>
              <Text style={styles.statusText}>เซิร์ฟเวอร์ปกติ ความหน่วง 24ms.</Text>
            </View>
          </View>

          {/* --- Popular Courses --- */}
          <View style={styles.popularCourses}>
            <View style={styles.popularHeader}>
              <View>
                <Text style={styles.chartTitle}>หลักสูตรยอดนิยม</Text>
                <Text style={styles.chartSubtitle}>หลักสูตรที่มีความต้องการสูงในภาคเรียนนี้</Text>
              </View>
              <TouchableOpacity><Text style={styles.seeAllText}>ดูทั้งหมด</Text></TouchableOpacity>
            </View>

            {/* Course 1 */}
            <View style={styles.courseCard}>
              <View style={styles.courseImgBox} />
              <View style={styles.courseInfo}>
                <Text style={[styles.courseRank, { color: "#a73355" }]}>#1 มาแรง</Text>
                <Text style={styles.courseName} numberOfLines={1}>การศึกษานิทรรศการขั้นสูง</Text>
                <Text style={styles.courseStudents}>1,240 ลงทะเบียนแล้ว</Text>
              </View>
            </View>

            {/* Course 2 */}
            <View style={styles.courseCard}>
              <View style={styles.courseImgBox} />
              <View style={styles.courseInfo}>
                <Text style={[styles.courseRank, { color: "#7b5455" }]}>ยอดนิยม</Text>
                <Text style={styles.courseName} numberOfLines={1}>ประวัติศาสตร์วิชาการ</Text>
                <Text style={styles.courseStudents}>982 ลงทะเบียนแล้ว</Text>
              </View>
            </View>
          </View>

        </ScrollView>

        {/* --- Bottom Navigation (Admin Version) --- */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItemActive}>
            <MaterialIcons name="dashboard" size={24} color="#a73355" />
            <Text style={styles.navTextActive}>หลัก</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="auto-stories" size={24} color="#837375" />
            <Text style={styles.navText}>วิชา</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="group" size={24} color="#837375" />
            <Text style={styles.navText}>ผู้ใช้</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="payments" size={24} color="#837375" />
            <Text style={styles.navText}>จ่าย</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="settings" size={24} color="#837375" />
            <Text style={styles.navText}>ตั้งค่า</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(234, 224, 226, 0.5)",
    backgroundColor: "#FFF8F8"
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconButton: { padding: 4, borderRadius: 20 },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#1f1a1c" },
  profilePic: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "rgba(167, 51, 85, 0.2)" },
  
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  metricsContainer: { gap: 16, marginBottom: 24 },
  metricCard: {
    backgroundColor: "#FBF1F3",
    padding: 20,
    borderRadius: 16,
    borderBottomWidth: 4,
  },
  metricHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  iconWrapper: { width: 48, height: 48, borderRadius: 16, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: "bold" },
  metricLabel: { fontSize: 12, fontWeight: "bold", color: "#514345", marginTop: 20, marginBottom: 4 },
  metricValue: { fontSize: 32, fontWeight: "900", color: "#1f1a1c" },

  chartContainer: { backgroundColor: "#F5EBED", padding: 20, borderRadius: 16, marginBottom: 24, height: 320 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  chartTitle: { fontSize: 18, fontWeight: "bold", color: "#1f1a1c" },
  chartSubtitle: { fontSize: 12, color: "#514345" },
  chartToggle: { backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 20, padding: 2, justifyContent: "center" },
  chartToggleActive: { backgroundColor: "white", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, elevation: 1 },
  chartToggleActiveText: { fontSize: 12, fontWeight: "bold", color: "#a73355" },
  
  barChartArea: { flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 20 },
  barWrapper: { alignItems: "center", flex: 1 },
  bar: { width: "60%", borderRadius: 6, minHeight: 10 },
  barLabel: { fontSize: 10, color: "#514345", fontWeight: "bold", marginTop: 8 },

  quickActionContainer: { backgroundColor: "rgba(167, 51, 85, 0.05)", padding: 20, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: "rgba(167, 51, 85, 0.1)" },
  quickActionTitle: { fontSize: 18, fontWeight: "bold", color: "#a73355", marginBottom: 16 },
  actionBtn: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", padding: 16, borderRadius: 16, marginBottom: 12, elevation: 1 },
  actionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  actionText: { fontSize: 14, fontWeight: "bold", color: "#1f1a1c" },
  actionBadge: { backgroundColor: "#a73355", width: 24, height: 24, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  actionBadgeText: { color: "white", fontSize: 12, fontWeight: "bold" },

  systemStatus: { backgroundColor: "#EFE6E8", padding: 20, borderRadius: 16, marginBottom: 24 },
  statusLabel: { fontSize: 12, fontWeight: "bold", color: "#514345", marginBottom: 8 },
  statusDotWrapper: { position: "relative", width: 12, height: 12 },
  statusDot: { width: 12, height: 12, backgroundColor: "#22c55e", borderRadius: 6, position: "absolute" },
  statusDotPing: { width: 12, height: 12, backgroundColor: "#22c55e", borderRadius: 6, opacity: 0.5, transform: [{ scale: 1.5 }] },
  statusText: { fontSize: 14, fontWeight: "600", color: "#1f1a1c" },

  popularCourses: { backgroundColor: "#FBF1F3", padding: 20, borderRadius: 16, marginBottom: 10 },
  popularHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 },
  seeAllText: { fontSize: 12, fontWeight: "bold", color: "#a73355" },
  courseCard: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 16, borderRadius: 16, marginBottom: 12, elevation: 1 },
  courseImgBox: { width: 60, height: 60, borderRadius: 12, backgroundColor: "#FDEEF4", marginRight: 16 },
  courseInfo: { flex: 1 },
  courseRank: { fontSize: 10, fontWeight: "900", marginBottom: 4 },
  courseName: { fontSize: 14, fontWeight: "bold", color: "#1f1a1c", marginBottom: 4 },
  courseStudents: { fontSize: 10, fontWeight: "600", color: "#837375" },

  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 248, 248, 0.9)",
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(214, 194, 196, 0.2)",
    elevation: 10,
  },
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#FDEEF4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navTextActive: { fontSize: 10, fontWeight: "bold", color: "#a73355", marginTop: 4 },
  navItem: { alignItems: "center", paddingHorizontal: 12, paddingVertical: 8 },
  navText: { fontSize: 10, fontWeight: "bold", color: "#837375", marginTop: 4 },
});