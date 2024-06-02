"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";

import Button from "@/components/UI/Button";
import { BASEURL } from "@/constant/constant";
import { useAuth } from "@/context/AuthProvider";
import { IActivityRequestDataProps } from "@/types/activity/activity.types";
import { IUserDataProps } from "@/types/user/user.types";

import ConfirmChangeStatusModal from "../Modal/ConfirmChangeStatus";
import ConfirmSendActivityModal from "../Modal/ConfirmSendActivity";
import {
  handleAddInfo,
  handleGetUsers,
} from "./Officer/_action/AddUserDataTable";

interface ISendActivitySectionProps {
  label?: string;
  imageActivity?: File | null;
  activity?: IActivityRequestDataProps | undefined;
}

const SendActivitySection = ({
  label,
  imageActivity,
  activity,
}: ISendActivitySectionProps) => {
  // _Context
  const { activites, userInfo, getActivites, setReload } = useAuth();

  // _Router
  const router = useRouter();
  const pathName = usePathname();

  // _State
  const imageURL = `${imageActivity}`;
  const [infoUsers, setInfoUsers] = useState<IUserDataProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newActivity, setNewActivity] = useState<IActivityRequestDataProps>({
    id: "",
    activityUser: "",
    category: "",
    hour: 0,
    image: selectedImage,
    updateDate: "",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalChangeStatus, setModalChangeStatus] = useState<boolean>(false);
  const [statusLabel, setStatusLabel] = useState<string>("");
  const userID = pathName.replace("/personnel/form/", "");

  // _Action
  const handleSelectActivity = (event: ChangeEvent<HTMLInputElement>) => {
    const fileImage = event.target.files?.[0] || null;

    setSelectedImage(fileImage);
  };

  const handleAddActivity = async () => {
    if (selectedImage !== null) {
      try {
        await axios
          .post(
            `${BASEURL}/api/activity/`,
            {
              activityUser: newActivity.activityUser,
              category: newActivity.category,
              hour: newActivity.hour,
              updateDate: newActivity.updateDate,
              image: newActivity.image,
              status: "D",
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )
          .then(() => {
            toast.success("ส่งหลักฐานสำเร็จ");
            handleAddInfo({ activites, infoUsers });
            getActivites();
            router.push("/personnel");
          });
      } catch (error) {
        console.error("Error post api activity : ", error);
        toast.error("กรุณาส่งหลักฐานอีกครั้ง");
      }

      setSelectedImage(null);
    } else {
      toast.error("กรุณาเลือกไฟล์");
    }
  };

  const handleEditActivity = async () => {
    if (selectedImage !== null) {
      try {
        await axios
          .put(
            `${BASEURL}/api/activity/${userID}/`,
            {
              activityUser: activity?.activityUser,
              category: activity?.category,
              hour: activity?.hour,
              updateDate: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
              image: selectedImage,
              status: "D",
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )
          .then(() => {
            toast.success("ส่งหลักฐานสำเร็จ");
            handleAddInfo({ activites, infoUsers });
            getActivites();
            router.push("/personnel");
          });
      } catch (error) {
        console.error("Error post api activity : ", error);
        toast.error("กรุณาส่งหลักฐานอีกครั้ง");
      }
    } else {
      toast.error("กรุณาเลือกรูปภาพให้ตรงกับกิจกรรมที่จะส่ง");
    }
  };

  const handleChangeStatusActivity = async (pass: boolean) => {
    const storedToken = localStorage.getItem("auth_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

    await axios
      .put(`${BASEURL}/api/activity/${activity?.id}/`, {
        ...activity,
        status: pass ? "P" : "N",
      })
      .then(() => {
        toast.success("ทำรายการเสร็จสิ้น");
        setReload(true);
        router.push("/admin/index");
      });
  };

  const handleCloseModalConfirmSendAcitvity = () => {
    setModalOpen(false);
  };

  const handleCloseModalConfirmChangeStatus = () => {
    setModalChangeStatus(false);
  };

  // _Effect
  useEffect(() => {
    if (userInfo) {
      if (
        label ===
        "หลักฐานภาระงานด้านทำนุบำรุงศิลปวัฒนธรรมและอนุรักษ์สิ่งแวดล้อม"
      ) {
        setNewActivity({
          ...newActivity,
          activityUser: userInfo.id,
          category: "C",
          hour: 6,
          updateDate: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          // updateDate: Date.now(),
        });
      } else {
        setNewActivity({
          ...newActivity,
          activityUser: userInfo.id,
          category: "H",
          hour: 4,
          updateDate: format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          // updateDate: Date.now(),
        });
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (selectedImage) {
      setNewActivity({ ...newActivity, image: selectedImage });
    }
  }, [selectedImage]);

  useEffect(() => {
    handleGetUsers(setInfoUsers);
  }, []);

  return (
    <section>
      <div
        className={clsx([
          `container`,
          `mt-10`,
          `main-space-x`,
          `space-y-16`,
          `sm:space-y-6`,
        ])}
      >
        <p className={clsx([`text-center text-header-3`, `lg:text-body-24`])}>
          {label}
        </p>

        {userInfo?.role === "Personnel" &&
          (activity === undefined || activity.status === "N") && (
            <div className={clsx([`list-box-search`])}>
              <div className={clsx([`list-box-search-label`])}>
                <label>ประเภท</label>
                <span>:</span>
              </div>

              <input
                type="file"
                accept="image/*"
                className={clsx([`rounded-3xl bg-primary-500 px-6 py-2`])}
                onChange={handleSelectActivity}
              />
            </div>
          )}

        <div className={clsx([`flex items-center justify-center`])}>
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="image activity"
              className={clsx(`h-412 w-412 object-cover`)}
            />
          ) : imageURL !== "undefined" ? (
            <img
              src={imageURL}
              alt="image activity"
              className={clsx(`h-412 w-412 object-cover`)}
            />
          ) : (
            <div
              className={clsx([
                `flex h-412 w-412 flex-col items-center justify-center bg-secondary-500 text-center`,
              ])}
            >
              <p>รูปภาพตัวอย่าง</p>
              <p>JPG, GIF or PNG. Max size of 20MB</p>
            </div>
          )}
        </div>

        {userInfo?.role === "Admin" && (
          <div className={clsx([`flex items-center justify-center pb-10`])}>
            <div className={clsx([`space-x-20`, `sm:space-x-4`])}>
              <Button
                variant="success"
                rounder="full"
                // onClick={() => handleChangeStatusActivity(true)}
                onClick={() => {
                  setStatusLabel("ผ่าน");
                  setModalChangeStatus(true);
                }}
              >
                <p className={clsx([`px-5 text-body-24 sm:text-body-18`])}>
                  ผ่าน
                </p>
              </Button>
              <Button
                variant="milk-pink"
                rounder="full"
                // onClick={() => handleChangeStatusActivity(false)}
                onClick={() => {
                  setStatusLabel("ไม่ผ่าน");
                  setModalChangeStatus(true);
                }}
              >
                <p className={clsx([`px-5 text-body-24 sm:text-body-18`])}>
                  ไม่ผ่าน
                </p>
              </Button>
            </div>
          </div>
        )}

        {userInfo?.role === "Personnel" &&
          (activity === undefined || activity.status === "N") && (
            <div className={clsx([`flex items-center justify-center pb-10`])}>
              <Button
                variant="milk-pink"
                rounder="full"
                onClick={() => {
                  if (activity === undefined) {
                    if (selectedImage !== null) {
                      setModalOpen(true);
                    } else {
                      toast.error("กรุณาเลือกไฟล์");
                    }
                  } else {
                    handleEditActivity();
                  }
                }}
              >
                <p className={clsx([`px-5 text-body-24`])}>ส่ง</p>
              </Button>
            </div>
          )}
      </div>
      <ConfirmSendActivityModal
        isOpen={modalOpen}
        handleAddActivity={handleAddActivity}
        closeModal={handleCloseModalConfirmSendAcitvity}
      />
      <ConfirmChangeStatusModal
        label={statusLabel}
        handleChangeStatusActivity={handleChangeStatusActivity}
        closeModal={handleCloseModalConfirmChangeStatus}
        isOpen={modalChangeStatus}
      />
    </section>
  );
};

export default SendActivitySection;
