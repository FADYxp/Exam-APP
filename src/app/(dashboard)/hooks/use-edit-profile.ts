import { useMutation } from "@tanstack/react-query";
import EditProfileService from "../services/edit-profile.service";
import {
  EditProfilePayload,
  EditProfileSuccessResponse,
} from "@/lib/types/edit-profile";

export function useEditProfile() {
  const {
    mutate: editProfile,
    isPending,
    isError,
  } = useMutation<EditProfileSuccessResponse, Error, EditProfilePayload>({
    mutationFn: async (values) => {
      const payload = await EditProfileService(values);

      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });
  return { editProfile, isPending, isError };
}
