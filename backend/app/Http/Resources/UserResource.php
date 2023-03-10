<?php

namespace App\Http\Resources;

use App\Models\UserInfo;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $permisstion = [];
        foreach (PermissionResource::collection($this->getAllPermissions()) as $obj) {
            $permisstion[] = $obj->name;
        }
        $userInfo = UserInfo::find($this->id);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'is_active' => $this->is_active,
            'group_role' => $this->role->title,
            'group_role_id' => $this->role->id,
            'permisstion' => $permisstion
        ];
    }
}
