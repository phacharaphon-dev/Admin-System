import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AdminCourseScreen({ setView }) {
  const [searchQuery, setSearchQuery] = useState("");

  // 🌟 ข้อมูลจำลองสำหรับรายวิชา (แปลงจาก HTML ของคุณ)
  const courseData = [
    {
      id: "CS-101",
      title: "มนุษยวิทยาในโลกดิจิทัล",
      teacher: "ดร. เอลาร่า ธอร์น",
      enrolled: 12,
      maxSeats: 20,
      price: "$1,200",
      status: "เปิดรับ",
      statusColor: "#15803d", // Green
      statusBg: "#dcfce7",
      progress: 60,
      prerequisite: false,
    },
    {
      id: "LIT-204",
      title: "กวีนิพนธ์สมัยใหม่",
      teacher: "ศ. จูเลียน เวน",
      enrolled: 15,
      maxSeats: 15,
      price: "$850",
      status: "เต็ม",
      statusColor: "#b91c1c", // Red
      statusBg: "#fee2e2",
      progress: 100,
      prerequisite: true,
      progressColor: "#ef4444",
    },
    {
      id: "ARC-402",
      title: "ผังเมืองสถาปัตยกรรมบรูทัลลิสต์",
      teacher: "สถาปนิก ซาร่าห์ เชน",
      enrolled: 5,
      maxSeats: 12,
      price: "$1,550",
      status: "ปิดรับ",
      statusColor: "#52525b", // Zinc
      statusBg: "#e4e4e7",
      progress: 41,
      prerequisite: false,
    },
    {
      id: "PHI-331",
      title: "จริยธรรมในปัญญาประดิษฐ์",
      teacher: "ดร. มาร์คัส ออเรลิอัส",
      enrolled: 22,
      maxSeats: 30,
      price: "$950",
      status: "เปิดรับ",
      statusColor: "#15803d", // Green
      statusBg: "#dcfce7",
      progress: 73,
      prerequisite: false,
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="menu" size={28} color="#7b5455" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>จัดการรายวิชา</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=5" }}
              style={styles.profilePic}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* --- Hero & Search Section --- */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>แค็ตตาล็อกรายวิชา</Text>
            <Text style={styles.heroDesc}>
              จัดการหลักสูตร ติดตามการลงทะเบียน และดูแลเส้นทางการศึกษาสำหรับภาคเรียนที่จะถึงนี้
            </Text>
            
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={24} color="#837375" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="ค้นหารายวิชา..."
                placeholderTextColor="#837375"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* --- Course Grid --- */}
          <View style={styles.courseGrid}>
            {courseData.map((course, index) => (
              <TouchableOpacity key={index} style={styles.courseCard} activeOpacity={0.8}>
                
                {/* Card Header (ID & Actions) */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.courseIdBadge}>
                    <Text style={styles.courseIdText}>{course.id}</Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.actionIconBtn}>
                      <MaterialIcons name="edit" size={16} color="#837375" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIconBtn}>
                      <MaterialIcons name="delete" size={16} color="#ba1a1a" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Course Details */}
                <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                <Text style={styles.courseTeacher}>
                  <Text style={{ color: "#837375" }}>อาจารย์ผู้สอน: </Text>
                  {course.teacher}
                </Text>

                {/* Prerequisite Tag */}
                {course.prerequisite && (
                  <View style={styles.prereqTag}>
                    <MaterialIcons name="info" size={12} color="#9c225e" />
                    <Text style={styles.prereqText}>ต้องผ่านวิชาบังคับก่อน</Text>
                  </View>
                )}

                {/* Enrollment Progress */}
                <View style={styles.progressSection}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>การลงทะเบียน</Text>
                    <Text style={[styles.progressValue, course.status === "เต็ม" && { color: "#ba1a1a" }]}>
                      {course.enrolled} / {course.maxSeats} ที่นั่ง
                    </Text>
                  </View>
                  
                  <View style={styles.progressBarBg}>
                    {course.progressColor ? (
                      <View style={[styles.progressBarFill, { width: `${course.progress}%`, backgroundColor: course.progressColor }]} />
                    ) : (
                      <LinearGradient
                        colors={["#7b5455", "#a73355"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressBarFill, { width: `${course.progress}%` }]}
                      />
                    )}
                  </View>

                  <View style={styles.bottomRow}>
                    <View style={styles.priceContainer}>
                      <MaterialIcons name="payments" size={16} color="#a73355" />
                      <Text style={styles.priceText}>{course.price}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: course.statusBg }]}>
                      <Text style={[styles.statusText, { color: course.statusColor }]}>{course.status}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* --- Settings / Management Links --- */}
          <View style={styles.settingsSection}>
            
            <TouchableOpacity style={styles.settingsCard} activeOpacity={0.8}>
              <View style={[styles.settingIconBox, { backgroundColor: "#ffd9df" }]}>
                <MaterialIcons name="calendar-month" size={32} color="#3f0017" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>ตารางสอน</Text>
                <Text style={styles.settingDesc}>แก้ไขวัน เวลา และสถานที่สำหรับรายวิชาที่กำลังเปิดสอนอยู่ทั้งหมด</Text>
                <View style={styles.settingLinkRow}>
                  <Text style={styles.settingLinkText}>จัดการวันที่</Text>
                  <MaterialIcons name="arrow-forward" size={14} color="#a82d68" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsCard} activeOpacity={0.8}>
              <View style={[styles.settingIconBox, { backgroundColor: "#ffdad9" }]}>
                <MaterialIcons name="badge" size={32} color="#2f1314" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>ศูนย์รวมอาจารย์ผู้สอน</Text>
                <Text style={styles.settingDesc}>มอบหมายผู้ดูแลหลักและวิทยากรพิเศษสำหรับโมดูลหลักสูตรเฉพาะด้าน</Text>
                <View style={styles.settingLinkRow}>
                  <Text style={styles.settingLinkText}>จัดการทีมงาน</Text>
                  <MaterialIcons name="arrow-forward" size={14} color="#a82d68" />
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>

        {/* --- Floating Action Button (FAB) --- */}
        <TouchableOpacity style={styles.fabBtn} activeOpacity={0.9}>
          <LinearGradient
            colors={["#7b5455", "#a73355"]}
            style={styles.fabGradient}
          >
            <MaterialIcons name="add" size={32} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* --- Bottom Navigation --- */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setView && setView("DASHBOARD")}>
            <MaterialIcons name="dashboard" size={24} color="#837375" />
            <Text style={styles.navText}>หลัก</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItemActive}>
            <MaterialIcons name="auto-stories" size={24} color="#a73355" />
            <Text style={styles.navTextActive}>วิชา</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F8" },
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
  
  scrollContent: { padding: 20, paddingBottom: 120 },
  
  heroSection: { marginBottom: 30 },
  heroTitle: { fontSize: 32, fontWeight: "900", color: "#1f1a1c", marginBottom: 8, letterSpacing: -0.5 },
  heroDesc: { fontSize: 14, color: "#514345", lineHeight: 22, marginBottom: 24 },
  
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBF1F3",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: "#1f1a1c" },

  courseGrid: { gap: 16, marginBottom: 32 },
  courseCard: {
    backgroundColor: "#FBF1F3",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(214, 194, 196, 0.3)",
  },
  cardHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  courseIdBadge: { backgroundColor: "rgba(123, 84, 85, 0.1)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  courseIdText: { fontSize: 10, fontWeight: "bold", color: "#7b5455", letterSpacing: 1 },
  cardActions: { flexDirection: "row", gap: 8 },
  actionIconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  
  courseTitle: { fontSize: 18, fontWeight: "bold", color: "#1f1a1c", marginBottom: 4 },
  courseTeacher: { fontSize: 13, color: "#1f1a1c", marginBottom: 12 },
  
  prereqTag: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffd9e4", alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4, marginBottom: 12 },
  prereqText: { fontSize: 10, fontWeight: "bold", color: "#9c225e" },

  progressSection: { marginTop: 12, paddingTop: 20, borderTopWidth: 1, borderTopColor: "rgba(214, 194, 196, 0.4)" },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progressLabel: { fontSize: 12, fontWeight: "600", color: "#837375" },
  progressValue: { fontSize: 12, fontWeight: "bold", color: "#1f1a1c" },
  progressBarBg: { height: 6, backgroundColor: "#eae0e2", borderRadius: 3, overflow: "hidden", marginBottom: 16 },
  progressBarFill: { height: "100%", borderRadius: 3 },
  
  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  priceContainer: { flexDirection: "row", alignItems: "center", gap: 4 },
  priceText: { fontSize: 14, fontWeight: "bold", color: "#a73355" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: "bold", letterSpacing: -0.5 },

  settingsSection: { gap: 16, marginBottom: 20 },
  settingsCard: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.6)", padding: 20, borderRadius: 20, borderWidth: 1, borderColor: "rgba(167, 51, 85, 0.1)", gap: 16 },
  settingIconBox: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  settingInfo: { flex: 1 },
  settingTitle: { fontSize: 18, fontWeight: "bold", color: "#1f1a1c", marginBottom: 4 },
  settingDesc: { fontSize: 12, color: "#514345", marginBottom: 12, lineHeight: 18 },
  settingLinkRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  settingLinkText: { fontSize: 11, fontWeight: "bold", color: "#a82d68", letterSpacing: 0.5 },

  fabBtn: { position: "absolute", bottom: 90, right: 20, zIndex: 40, elevation: 8, shadowColor: "#a73355", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  fabGradient: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 248, 248, 0.95)",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(214, 194, 196, 0.2)",
    elevation: 20,
    shadowColor: "#a73355",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#F5EBED",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navTextActive: { fontSize: 10, fontWeight: "bold", color: "#a73355", marginTop: 4 },
  navItem: { alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, opacity: 0.7 },
  navText: { fontSize: 10, fontWeight: "bold", color: "#837375", marginTop: 4 },
});