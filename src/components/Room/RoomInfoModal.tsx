import React, { FormEvent } from "react";
import Modal from "../Modal";
import { FaTrashAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { axiosInstance } from "../../services/axios";
import getRoomId from "../../hooks/getRoomId";
import { UserType } from "../../types/user.type";
import { useNavigate } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import toast from "react-hot-toast";
interface RoomInfoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  room: any;
}

const RoomInfoModal: React.FC<RoomInfoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  room,
}) => {
  const { roomId } = getRoomId();
  const navigate = useNavigate();

  const deleteChatHandler = async () => {
    const res = await axiosInstance.post(`/chat/api/v1/room/delete/${roomId}`);
    if (res.status === 200) {
      navigate("/room");
      setIsModalOpen(false);
    }
  };

  const createRoomHandler = async (userId: string) => {
    const response = await axiosInstance.post(`/chat/api/v1/room/private`, {
      userId,
    });

    if (response.status === 200) {
      setIsModalOpen(false);
      toast.success("create public room is success");
    }
  };
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="w-[21rem] text-black relative">
        <div className="sticky bg-indigo-60 border-b">
          <p className="font-bold py-1 px-3">Room Info</p>
        </div>
        <div className="flex items-center px-3 hover:bg-[#DFE7FF] duration-300">
          <div className="px-3 py-5 w-16 h-16 rounded-full flex justify-center items-center bg-pink-500">
            <p className="text-2xl text-white">{room?.name?.slice(0, 1)}</p>
          </div>
          <div className="px-3 py-5 ml-4">
            <h1 className="text-lg font-semibold">{room?.name}</h1>
            <p>last seen recently</p>
          </div>
        </div>

        <div className="hover:bg-[#DFE7FF] duration-300">
          <div className="px-3 pb-2 flex items-center">
            <FaUserGroup className="text-2xl my-4" />
            <p className="ml-4 font-semibold"> {room?.users?.length} members</p>
          </div>
        </div>

        <div className="border-t">
          {room?.users?.map((user: UserType) => (
            <div
              className="border-b pb-3 hover:bg-[#DFE7FF] duration-300"
              key={user?.id}
            >
              <div
                className="px-3 flex items-center"
                onClick={() => createRoomHandler(user?.id)}
              >
                <div className="w-12 h-12 my-2 rounded-full bg-pink-500 flex justify-center items-center">
                  <p className="text-2xl text-white">
                    {user?.firstName?.length
                      ? user.lastName?.slice(0, 1)
                      : user.username?.slice(0, 1)}
                  </p>
                </div>
                <div className="ml-2">
                  {user?.firstName && user?.lastName ? (
                    <>
                      <p>{user.firstName}</p>
                      <p>{user.lastName}</p>
                    </>
                  ) : (
                    <p>{user.username}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-2 px-3 cursor-pointer hover:bg-[#DFE7FF] duration-300">
          <div className="flex items-center text-red-600">
            <MdBlock />
            <p className="ml-1">block</p>
          </div>
        </div>
        <div
          className="px-3 py-2 cursor-pointer hover:bg-[#DFE7FF] duration-300"
          onClick={deleteChatHandler}
        >
          <div className="flex items-center text-red-600 ">
            <FaTrashAlt />
            <p className="ml-1">Delete</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomInfoModal;
